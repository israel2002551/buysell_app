import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Store, ShoppingBag, RefreshCw, Mail, Lock, 
  Phone, ArrowRight, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/App';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string, role: UserRole) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';
type UserType = 'buyer' | 'seller' | 'both';

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mode === 'login') {
      onLogin(email, password, userType);
    } else if (mode === 'signup') {
      onLogin(email, password, userType);
    } else if (mode === 'forgot') {
      setForgotSent(true);
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setForgotSent(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/25">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-xl text-slate-900">BUY</span>
                <span className="font-bold text-xl text-amber-500">SELL</span>
              </div>
            </div>

            {/* Tabs */}
            {mode !== 'forgot' && (
              <Tabs value={mode} onValueChange={(v) => { setMode(v as AuthMode); resetForm(); }} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            {/* Forms */}
            <AnimatePresence mode="wait">
              {mode === 'forgot' && !forgotSent ? (
                <motion.form
                  key="forgot"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Reset Password</h3>
                    <p className="text-sm text-slate-500">Enter your email to receive a reset link</p>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 py-6 rounded-xl"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-semibold"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>Send Reset Link <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    Back to Sign In
                  </button>
                </motion.form>
              ) : mode === 'forgot' && forgotSent ? (
                <motion.div
                  key="forgot-sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Check Your Email</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    We've sent a password reset link to {email}
                  </p>
                  <Button
                    onClick={() => { setMode('login'); setForgotSent(false); }}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Back to Sign In
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* User Type Selection - Sign Up Only */}
                  {mode === 'signup' && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700">I want to...</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { type: 'buyer', icon: ShoppingBag, label: 'Buyer', desc: 'Shop' },
                          { type: 'seller', icon: Store, label: 'Seller', desc: 'Sell' },
                          { type: 'both', icon: RefreshCw, label: 'Both', desc: 'Buy & Sell' },
                        ].map((option) => (
                          <button
                            key={option.type}
                            type="button"
                            onClick={() => setUserType(option.type as UserType)}
                            className={cn(
                              "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all",
                              userType === option.type
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-slate-200 hover:border-slate-300 text-slate-600"
                            )}
                          >
                            <option.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{option.label}</span>
                            <span className="text-xs opacity-70">{option.desc}</span>
                          </button>
                        ))}
                      </div>
                      {userType === 'both' && (
                        <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                          You'll have access to both Buyer and Seller dashboards
                        </p>
                      )}
                    </div>
                  )}

                  {/* Name - Sign Up Only */}
                  {mode === 'signup' && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12 py-6 rounded-xl"
                        required
                      />
                    </div>
                  )}

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 py-6 rounded-xl"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 py-6 rounded-xl"
                      required
                      minLength={6}
                    />
                  </div>

                  {/* WhatsApp - Seller/Both Only */}
                  {mode === 'signup' && (userType === 'seller' || userType === 'both') && (
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="tel"
                        placeholder="WhatsApp Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-12 py-6 rounded-xl"
                        required
                      />
                    </div>
                  )}

                  {/* Forgot Password Link */}
                  {mode === 'login' && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-semibold"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : mode === 'login' ? (
                      <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>
                    ) : (
                      <>Create Account <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>

                  {/* Terms */}
                  {mode === 'signup' && (
                    <p className="text-xs text-center text-slate-500">
                      By signing up, you agree to our{' '}
                      <a href="#" className="text-emerald-600 hover:underline">Terms</a> and{' '}
                      <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
