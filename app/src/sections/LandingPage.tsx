import { motion } from 'framer-motion';
import { 
  ShoppingBag, Store, Shield, CreditCard, Truck, Star, 
  TrendingUp, Globe, MessageCircle, ArrowRight, Check,
  Zap, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LandingPageProps {
  onEnterBuyer: () => void;
  onEnterSeller: () => void;
  onLogin: () => void;
}

const features = [
  { icon: Shield, title: 'Buyer Protection', desc: 'Full refund guarantee on all purchases' },
  { icon: CreditCard, title: 'Secure Payments', desc: 'Paystack & bank transfer supported' },
  { icon: Truck, title: 'Fast Delivery', desc: '2-5 days nationwide delivery' },
  { icon: Star, title: 'Verified Reviews', desc: 'Real feedback from real buyers' },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '100K+', label: 'Products Listed' },
  { value: '₦2B+', label: 'GMV Processed' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function LandingPage({ onEnterBuyer, onEnterSeller, onLogin }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <div>
              <span className="font-bold text-xl text-white">BUY</span>
              <span className="font-bold text-xl text-amber-400">SELL</span>
              <span className="text-xs text-emerald-400/60 block -mt-1">.nigeria</span>
            </div>
          </div>
          <Button
            onClick={onLogin}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-full px-6"
          >
            Sign In
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12 lg:mb-16"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-1.5 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Nigeria's #1 Seller-First Marketplace
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Buy, Sell & Earn —
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                The Nigerian Way
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-8"
            >
              Authentic products, secure Paystack payments, dropshipping & affiliate income. 
              All in one powerful platform.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-emerald-300/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Portal Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {/* Buyer Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                    Most Popular
                  </Badge>
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  I'm a Buyer
                </h2>
                <p className="text-emerald-100/70 mb-6">
                  Discover authentic products from verified Nigerian sellers. 
                  Pay securely via Paystack or bank transfer.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: Shield, text: 'Buyer Protection' },
                    { icon: CreditCard, text: 'Paystack Secure' },
                    { icon: MessageCircle, text: 'WhatsApp Support' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-emerald-100/80">
                      <item.icon className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onEnterBuyer}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-6 rounded-xl shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-all"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>

            {/* Seller Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    1 Month FREE
                  </Badge>
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25">
                  <Store className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  I'm a Seller
                </h2>
                <p className="text-emerald-100/70 mb-6">
                  Open your store FREE for 1 month! List products with videos, 
                  dropship globally, earn affiliate income.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: TrendingUp, text: 'Sales Analytics' },
                    { icon: Globe, text: 'Dropshipping' },
                    { icon: Star, text: 'Reviews System' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-emerald-100/80">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onEnterSeller}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-6 rounded-xl shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all"
                >
                  Open Your Store
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Why Nigerians Trust BUYSELL
            </h2>
            <p className="text-emerald-100/70 max-w-xl mx-auto">
              Built with security and trust at its core
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-emerald-100/60">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {[
              { icon: Shield, text: 'SSL Secured' },
              { icon: CreditCard, text: 'Paystack Payments' },
              { icon: Clock, text: '24/7 Support' },
              { icon: Check, text: 'Buyer Protection' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-emerald-300/60">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
