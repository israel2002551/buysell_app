import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, CreditCard, Building2, Truck, User, 
  MapPin, Phone, Mail, ChevronRight, ChevronLeft,
  Shield, Lock, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem, UserProfile } from '@/App';
import { cn, formatCurrency } from '@/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  user: UserProfile | null;
}

type CheckoutStep = 'delivery' | 'payment' | 'confirmation';
type PaymentMethod = 'paystack' | 'transfer';

export function CheckoutModal({ isOpen, onClose, cart, total, user }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const shipping = total > 50000 ? 0 : 2500;
  const finalTotal = total + shipping;
  const commission = Math.round(finalTotal * 0.03);

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderId('BS-' + Date.now().toString().slice(-8));
    setIsProcessing(false);
    setStep('confirmation');
  };

  const steps = [
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'confirmation', label: 'Confirm', icon: Check },
  ];

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
          className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Secure Checkout</h2>
                <p className="text-sm text-slate-500">Step {steps.findIndex(s => s.id === step) + 1} of 3</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center px-8 py-4 bg-slate-50">
            {steps.map((s, index) => {
              const isActive = s.id === step;
              const isCompleted = steps.findIndex(st => st.id === step) > index;
              
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isActive ? "bg-emerald-600 text-white" :
                    isCompleted ? "bg-emerald-100 text-emerald-600" :
                    "bg-slate-200 text-slate-400"
                  )}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "ml-2 text-sm font-medium hidden sm:block",
                    isActive ? "text-slate-900" : "text-slate-400"
                  )}>
                    {s.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 mx-4 rounded-full",
                      isCompleted ? "bg-emerald-500" : "bg-slate-200"
                    )} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <AnimatePresence mode="wait">
              {step === 'delivery' && (
                <motion.form
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleDeliverySubmit}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Delivery Information</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        placeholder="Full Name"
                        value={deliveryInfo.name}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                        className="pl-12 py-6 rounded-xl"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        placeholder="Phone Number"
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                        className="pl-12 py-6 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={deliveryInfo.email}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                      className="pl-12 py-6 rounded-xl"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Street Address"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      className="pl-12 py-6 rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      className="py-6 rounded-xl"
                      required
                    />
                    <Input
                      placeholder="State"
                      value={deliveryInfo.state}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })}
                      className="py-6 rounded-xl"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-semibold"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.form>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Method</h3>

                  {/* Payment Options */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentMethod('paystack')}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        paymentMethod === 'paystack'
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">Pay with Paystack</p>
                          <p className="text-sm text-slate-500">Card, USSD, Bank Transfer</p>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === 'paystack' ? "border-emerald-500" : "border-slate-300"
                        )}>
                          {paymentMethod === 'paystack' && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('transfer')}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        paymentMethod === 'transfer'
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">Bank Transfer</p>
                          <p className="text-sm text-slate-500">Direct to seller</p>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === 'transfer' ? "border-emerald-500" : "border-slate-300"
                        )}>
                          {paymentMethod === 'transfer' && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Order Summary */}
                  <Card className="bg-slate-50 border-0">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Subtotal</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Platform Fee (3%)</span>
                        <span>{formatCurrency(commission)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl text-emerald-600">
                          {formatCurrency(finalTotal + commission)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep('delivery')}
                      className="flex-1 py-6 rounded-xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-semibold"
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          Pay {formatCurrency(finalTotal + commission)}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h3>
                  <p className="text-slate-500 mb-6">
                    Your order has been confirmed. The seller will be notified.
                  </p>

                  <Card className="bg-slate-50 border-0 mb-6">
                    <CardContent className="p-4 text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Order ID</span>
                        <span className="font-mono font-medium">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Paid</span>
                        <span className="font-bold text-emerald-600">
                          {formatCurrency(finalTotal + commission)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Est. Delivery</span>
                        <span className="font-medium">2-5 business days</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 py-6 rounded-xl"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      onClick={onClose}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl"
                    >
                      View Orders
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
