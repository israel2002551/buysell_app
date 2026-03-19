import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, MapPin, Store, Check, Share2, Heart, 
  MessageCircle, Shield, Clock, Package, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/App';
import { cn, formatCurrency } from '@/lib/utils';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const reviews = [
  { id: 1, user: 'John D.', rating: 5, comment: 'Excellent product! Exactly as described.', date: '2 days ago' },
  { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good quality, fast delivery.', date: '1 week ago' },
  { id: 3, user: 'Mike K.', rating: 5, comment: 'Best seller on the platform!', date: '2 weeks ago' },
];

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            <div className="grid lg:grid-cols-2 h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="bg-slate-100 p-6 lg:p-8 flex flex-col">
                {/* Main Image */}
                <div className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden bg-white">
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveImage(prev => (prev + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge className="bg-red-500 text-white border-0">
                        -{discount}%
                      </Badge>
                    )}
                    {product.isDropship && (
                      <Badge className="bg-blue-500 text-white border-0">
                        Dropship
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={cn(
                          "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all",
                          activeImage === index 
                            ? "border-emerald-500 ring-2 ring-emerald-500/20" 
                            : "border-transparent hover:border-slate-300"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-6 lg:p-8 overflow-y-auto">
                {/* Seller Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
                      {product.seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{product.seller.name}</p>
                    <div className="flex items-center gap-2">
                      {product.seller.verified && (
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Store className="w-4 h-4" />
                    View Store
                  </Button>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h2>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-900">{product.rating}</span>
                  </div>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">{product.reviewCount} reviews</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">{product.stock} in stock</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-slate-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-600 mb-6">{product.description}</p>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="secondary" className="gap-1">
                    <Package className="w-3 h-3" />
                    {product.condition === 'new' ? 'Brand New' : 'Used'}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    {product.location}
                  </Badge>
                  {product.negotiable && (
                    <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Negotiable
                    </Badge>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium text-slate-700">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-6">
                  <Button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-semibold"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-red-500 text-red-500")} />
                  </Button>
                  <Button variant="outline" className="px-4">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* WhatsApp */}
                <Button variant="outline" className="w-full gap-2 mb-6">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  Chat with Seller on WhatsApp
                </Button>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    Buyer Protection
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    2-5 Day Delivery
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="description" className="mt-8">
                  <TabsList className="w-full bg-slate-100 p-1">
                    <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1">Reviews ({product.reviewCount})</TabsTrigger>
                    <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-4">
                    <p className="text-slate-600">{product.description}</p>
                    <ul className="mt-4 space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        100% authentic product
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        Secure payment via Paystack
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        7-day return policy
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-900">{review.user}</span>
                            <span className="text-sm text-slate-400">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-slate-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="shipping" className="mt-4">
                    <div className="space-y-4 text-slate-600">
                      <p>We offer nationwide delivery across Nigeria:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Lagos: 1-2 business days
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Abuja, Port Harcourt: 2-3 business days
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          Other states: 3-5 business days
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
