import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Filter, ChevronLeft, ChevronRight, Star, 
  MapPin, Heart, Share2, TrendingUp, Flame, Sparkles,
  Package, Shield, CreditCard, Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/App';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface BuyerViewProps {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=500&fit=crop',
    badge: { text: 'HOT DEALS', color: 'bg-amber-500' },
    title: 'Tech & Electronics',
    description: 'Up to 70% off on smartphones, laptops & accessories',
    cta: 'Shop Now',
    category: 'electronics'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&h=500&fit=crop',
    badge: { text: 'NEW ARRIVALS', color: 'bg-emerald-500' },
    title: 'African Fashion',
    description: 'Authentic Ankara, Aso-oke & contemporary styles',
    cta: 'Explore',
    category: 'fashion'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=500&fit=crop',
    badge: { text: 'SECURE CHECKOUT', color: 'bg-blue-500' },
    title: 'Pay with Paystack',
    description: 'Cards, bank transfer, USSD & more. 100% secure.',
    cta: 'Browse All',
    category: 'all'
  }
];

const categories = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'electronics', name: 'Electronics', icon: TrendingUp },
  { id: 'fashion', name: 'Fashion', icon: ShoppingBag },
  { id: 'phones', name: 'Phones', icon: Package },
  { id: 'home', name: 'Home', icon: MapPin },
  { id: 'dropship', name: 'Dropship', icon: TrendingUp, special: true },
  { id: 'trending', name: 'Trending', icon: Flame, special: true },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export function BuyerView({ 
  products, 
  searchQuery, 
  selectedCategory, 
  onCategoryChange,
  onProductClick,
  onAddToCart 
}: BuyerViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'trending') {
        result = result.filter(p => p.rating >= 4.5 || p.reviewCount > 50);
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order (newest)
        break;
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 pb-24 lg:pb-8"
    >
      {/* Hero Carousel */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={carouselRef}
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 lg:px-12 max-w-lg">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge className={cn(
                        "mb-4 text-white border-0",
                        heroSlides[currentSlide].badge.color
                      )}>
                        {heroSlides[currentSlide].badge.text}
                      </Badge>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl lg:text-4xl font-bold text-white mb-3"
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-300 mb-6 text-sm lg:text-base"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={() => onCategoryChange(heroSlides[currentSlide].category)}
                        className="bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-full px-6"
                      >
                        {heroSlides[currentSlide].cta}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentSlide(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentSlide 
                      ? "w-8 bg-white" 
                      : "bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0",
                  selectedCategory === category.id
                    ? category.special
                      ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
                {selectedCategory === 'all' ? 'Latest Products' : 
                 selectedCategory === 'trending' ? 'Trending Products' :
                 categories.find(c => c.id === selectedCategory)?.name + ' Products'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {filteredProducts.length} items found
              </p>
            </div>
            
            {/* Sort & Filter */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <Button variant="outline" className="rounded-full gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                      {/* Image */}
                      <div 
                        className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() => onProductClick(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <Badge className="bg-red-500 text-white border-0 text-xs">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                          {product.hasVideo && (
                            <Badge className="bg-purple-500 text-white border-0 text-xs">
                              Video
                            </Badge>
                          )}
                          {product.isDropship && (
                            <Badge className="bg-blue-500 text-white border-0 text-xs">
                              Dropship
                            </Badge>
                          )}
                          {product.seller.verified && (
                            <Badge className="bg-emerald-500 text-white border-0 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-50">
                            <Heart className="w-4 h-4 text-slate-600" />
                          </button>
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-50">
                            <Share2 className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>

                        {/* Sold Out Overlay */}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                            <Badge className="bg-red-500 text-white text-sm px-4 py-2">
                              SOLD OUT
                            </Badge>
                          </div>
                        )}

                        {/* Quick Add Button */}
                        {product.stock > 0 && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product);
                            }}
                            className="absolute bottom-3 right-3 w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <ShoppingBag className="w-5 h-5 text-white" />
                          </motion.button>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 
                          className="font-semibold text-slate-900 line-clamp-1 mb-1 cursor-pointer hover:text-emerald-600 transition-colors"
                          onClick={() => onProductClick(product)}
                        >
                          {product.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                          </div>
                          <span className="text-xs text-slate-400">({product.reviewCount})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-lg font-bold text-slate-900">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-slate-400 line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Location & Seller */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{product.location}</span>
                        </div>

                        {/* Mobile Add Button */}
                        <Button
                          onClick={() => onAddToCart(product)}
                          disabled={product.stock === 0}
                          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl lg:hidden"
                          size="sm"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Shop with Confidence
              </h2>
              <p className="text-emerald-100">
                Your satisfaction is our priority
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Buyer Protection', desc: 'Full refund guarantee' },
                { icon: CreditCard, title: 'Secure Payments', desc: 'Paystack & bank transfer' },
                { icon: Truck, title: 'Fast Delivery', desc: '2-5 days nationwide' },
                { icon: Star, title: 'Verified Reviews', desc: 'Real buyer feedback' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                    <p className="text-emerald-100 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
