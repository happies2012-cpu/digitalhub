import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { initiatePayUPayment } from '@/lib/payments/payu';
import { initiateCashfreePayment } from '@/lib/payments/cashfree';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, Lock } from 'lucide-react';

interface CheckoutFormProps {
  planName: string;
  planPrice: number;
  planFeatures: string[];
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  planName,
  planPrice,
  planFeatures,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('payu');
  const [formData, setFormData] = useState({
    firstName: '',
    email: user?.email || '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let paymentData;

      if (paymentMethod === 'payu') {
        paymentData = await initiatePayUPayment({
          amount: planPrice,
          productInfo: `${planName} Plan Subscription`,
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          planName,
        });

        // Create form and submit to PayU
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentData.url;

        Object.entries(paymentData.params).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        paymentData = await initiateCashfreePayment({
          amount: planPrice,
          planName,
          customerName: formData.firstName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
        });

        // Redirect to Cashfree checkout
        window.location.href = `https://payments${
          import.meta.env.VITE_CASHFREE_ENV === 'production' ? '' : '-test'
        }.cashfree.com/order/#${paymentData.paymentSessionId}`;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: 'Unable to initiate payment. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Card variant="elevated" className="sticky top-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold capitalize">{planName} Plan</h3>
                <p className="text-sm text-muted-foreground">Monthly subscription</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Popular</Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">Features included:</p>
              <ul className="space-y-2">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Shield className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{planPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (18% GST)</span>
                <span>₹{Math.round(planPrice * 0.18).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="gradient-text">
                  ₹{Math.round(planPrice * 1.18).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <Lock className="h-4 w-4" />
              <span>Secure payment powered by industry-leading encryption</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">Full Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              <Separator />

              <PaymentMethodSelector
                selected={paymentMethod}
                onSelect={setPaymentMethod}
              />

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Pay ₹{Math.round(planPrice * 1.18).toLocaleString()}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
