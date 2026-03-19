import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Store, Search, ShoppingCart, Menu, X, 
  TrendingUp, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LandingPage } from '@/sections/LandingPage';
import { BuyerView } from '@/sections/BuyerView';
import { SellerDashboard } from '@/sections/SellerDashboard';
import { AdminPanel } from '@/sections/AdminPanel';
import { AuthModal } from '@/sections/AuthModal';
import { ProductModal } from '@/sections/ProductModal';
import { CartDrawer } from '@/sections/CartDrawer';
import { CheckoutModal } from '@/sections/CheckoutModal';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

// Types
export type UserRole = 'buyer' | 'seller' | 'admin' | null;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  stock: number;
  location: string;
  condition: 'new' | 'used';
  negotiable: boolean;
  hasVideo?: boolean;
  isDropship?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  whatsapp?: string;
  storeName?: string;
  isVerified: boolean;
}

// Mock Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Brand new sealed iPhone 15 Pro Max with 1 year Apple warranty',
    price: 1250000,
    originalPrice: 1350000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=400&fit=crop',
    category: 'phones',
    rating: 4.9,
    reviewCount: 128,
    seller: { id: 's1', name: 'TechHub NG', avatar: 'T', verified: true },
    stock: 15,
    location: 'Ikeja, Lagos',
    condition: 'new',
    negotiable: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Latest Samsung flagship with S Pen and AI features',
    price: 1150000,
    originalPrice: 1250000,
    image: 'https://images.unsplash.com/photo-1610945265078-3858a0828671?w=400&h=400&fit=crop',
    category: 'phones',
    rating: 4.8,
    reviewCount: 96,
    seller: { id: 's2', name: 'Mobile Masters', avatar: 'M', verified: true },
    stock: 8,
    location: 'Victoria Island, Lagos',
    condition: 'new',
    negotiable: false
  },
  {
    id: '3',
    name: 'MacBook Pro 14" M3 Pro',
    description: 'Professional laptop for creators and developers',
    price: 2100000,
    originalPrice: 2300000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    category: 'electronics',
    rating: 5.0,
    reviewCount: 64,
    seller: { id: 's1', name: 'TechHub NG', avatar: 'T', verified: true },
    stock: 5,
    location: 'Ikeja, Lagos',
    condition: 'new',
    negotiable: true
  },
  {
    id: '4',
    name: 'Ankara Print Dress - Premium',
    description: 'Beautiful African print dress, perfect for occasions',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    category: 'fashion',
    rating: 4.7,
    reviewCount: 234,
    seller: { id: 's3', name: 'African Styles', avatar: 'A', verified: true },
    stock: 25,
    location: 'Lekki, Lagos',
    condition: 'new',
    negotiable: true
  },
  {
    id: '5',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation headphones',
    price: 280000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviewCount: 89,
    seller: { id: 's4', name: 'Audio World', avatar: 'A', verified: false },
    stock: 12,
    location: 'Wuse, Abuja',
    condition: 'new',
    negotiable: false
  },
  {
    id: '6',
    name: 'Nike Air Force 1 - White',
    description: 'Classic sneakers, authentic Nike product',
    price: 95000,
    originalPrice: 110000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviewCount: 312,
    seller: { id: 's5', name: 'Sneaker City', avatar: 'S', verified: true },
    stock: 30,
    location: 'Port Harcourt',
    condition: 'new',
    negotiable: false
  },
  {
    id: '7',
    name: 'Dropship: Mini Projector 4K',
    description: 'Portable projector with 4K support, ships from supplier',
    price: 120000,
    originalPrice: 180000,
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop',
    category: 'dropship',
    rating: 4.5,
    reviewCount: 45,
    seller: { id: 's6', name: 'Global Imports', avatar: 'G', verified: true },
    stock: 999,
    location: 'International',
    condition: 'new',
    negotiable: false,
    isDropship: true
  },
  {
    id: '8',
    name: 'Kitchen Blender Set - 5 in 1',
    description: 'Multi-functional blender for all your kitchen needs',
    price: 35000,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
    category: 'home',
    rating: 4.4,
    reviewCount: 178,
    seller: { id: 's7', name: 'Home Essentials', avatar: 'H', verified: false },
    stock: 18,
    location: 'Ibadan',
    condition: 'new',
    negotiable: true
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'buyer' | 'seller' | 'admin'>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('buysell_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('buysell_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = (email: string, _password: string, role: UserRole) => {
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      avatar: 'J',
      role,
      isVerified: true
    });
    setIsAuthOpen(false);
    toast({
      title: 'Welcome back!',
      description: 'You have successfully logged in.',
    });
    if (role === 'seller') {
      setCurrentView('seller');
    } else if (role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('buyer');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  const enterAsBuyer = () => {
    setCurrentView('buyer');
  };

  const enterAsSeller = () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setCurrentView('seller');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      {currentView !== 'landing' && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200"
        >
          <div className="container-modern">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('buyer')}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <span className="text-white font-bold text-xl lg:text-2xl">B</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-lg lg:text-xl text-slate-900">BUY</span>
                  <span className="font-bold text-lg lg:text-xl text-amber-500">SELL</span>
                  <span className="text-xs text-slate-400 block -mt-1">.nigeria</span>
                </div>
              </motion.button>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search products, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Cart */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-slate-700" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* User Menu */}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-colors"
                      >
                        <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                          <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white font-semibold">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:block font-medium text-slate-700">{user.name}</span>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setCurrentView('buyer')}>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Browse Products
                      </DropdownMenuItem>
                      {user.role === 'seller' && (
                        <DropdownMenuItem onClick={() => setCurrentView('seller')}>
                          <Store className="w-4 h-4 mr-2" />
                          Seller Dashboard
                        </DropdownMenuItem>
                      )}
                      {user.role === 'admin' && (
                        <DropdownMenuItem onClick={() => setCurrentView('admin')}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Admin Panel
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={handleLogout}>
                        <X className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={() => setIsAuthOpen(true)}
                    className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6"
                  >
                    Sign In
                  </Button>
                )}

                {/* Mobile Menu */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="lg:hidden p-2.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <Menu className="w-6 h-6 text-slate-700" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-full border-slate-200 bg-slate-50"
              />
            </div>
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingPage 
            key="landing"
            onEnterBuyer={enterAsBuyer}
            onEnterSeller={enterAsSeller}
            onLogin={() => setIsAuthOpen(true)}
          />
        )}
        {currentView === 'buyer' && (
          <BuyerView
            key="buyer"
            products={mockProducts}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />
        )}
        {currentView === 'seller' && user?.role === 'seller' && (
          <SellerDashboard
            key="seller"
            user={user}
            products={mockProducts.filter(p => p.seller.id === 's1')}
          />
        )}
        {currentView === 'admin' && user?.role === 'admin' && (
          <AdminPanel key="admin" />
        )}
      </AnimatePresence>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        user={user}
      />

      {/* Mobile Bottom Navigation */}
      {currentView !== 'landing' && currentView !== 'seller' && currentView !== 'admin' && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 lg:hidden"
        >
          <div className="flex items-center justify-around py-2 pb-safe">
            <button
              onClick={() => setCurrentView('buyer')}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                currentView === 'buyer' ? "text-emerald-600" : "text-slate-400"
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-medium">Shop</span>
            </button>
            <button
              onClick={() => setSelectedCategory('all')}
              className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs font-medium">Browse</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs font-medium">Cart</span>
            </button>
            <button
              onClick={() => user ? setCurrentView('seller') : setIsAuthOpen(true)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <Store className="w-5 h-5" />
              <span className="text-xs font-medium">Sell</span>
            </button>
          </div>
        </motion.nav>
      )}
    </div>
  );
}

export default App;
