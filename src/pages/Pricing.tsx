import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Check,
  ArrowRight,
  Layers,
  Shield,
  Zap,
  CreditCard,
  Smartphone,
  Loader2,
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    period: '/month',
    description: 'Perfect for small businesses and solopreneurs',
    features: [
      'Up to 3 social accounts',
      'Basic SEO tools',
      '1,000 email sends/month',
      '7-day analytics history',
      'Email support',
    ],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4999,
    period: '/month',
    description: 'For growing teams and marketing professionals',
    features: [
      'Up to 15 social accounts',
      'Advanced SEO & keyword tracking',
      '25,000 email sends/month',
      '90-day analytics history',
      'Google & Meta Ads integration',
      'Priority support',
      'Custom reports',
    ],
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 9999,
    period: '/month',
    description: 'For agencies managing multiple clients',
    features: [
      'Unlimited social accounts',
      'Full SEO suite with competitor analysis',
      '100,000 email sends/month',
      'Unlimited analytics history',
      'All ad platform integrations',
      'White-label reporting',
      'Client portal access',
      'Dedicated account manager',
    ],
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 19999,
    period: '/month',
    description: 'Custom solutions for large organizations',
    features: [
      'Everything in Agency',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment option',
      'Custom AI models',
      'Dedicated success team',
      'Training & onboarding',
      'API access',
    ],
    popular: false,
  },
];

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay with any UPI app' },
  { id: 'gpay', name: 'Google Pay', icon: CreditCard, description: 'Fast checkout with GPay' },
  { id: 'payu', name: 'PayU', icon: Shield, description: 'Secure card payments' },
  { id: 'cashfree', name: 'Cashfree', icon: Zap, description: 'Multiple payment options' },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !selectedPayment) {
      toast({
        title: 'Please select options',
        description: 'Select a plan and payment method to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      navigate('/signup');
      return;
    }

    setProcessing(true);

    const plan = pricingPlans.find(p => p.id === selectedPlan);
    
    try {
      // Create subscription record
      const { error } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        plan_name: plan?.name || '',
        plan_price: plan?.price || 0,
        payment_provider: selectedPayment,
        status: 'pending',
      });

      if (error) throw error;

      // Simulate payment processing
      // In production, integrate with actual payment gateways
      toast({
        title: 'Redirecting to payment...',
        description: `Processing your ${plan?.name} subscription via ${selectedPayment.toUpperCase()}.`,
      });

      // Simulate payment success after 2 seconds
      setTimeout(() => {
        toast({
          title: 'Payment successful!',
          description: 'Welcome to DigitalHub. Redirecting to dashboard...',
        });
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      toast({
        title: 'Payment failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DigitalHub</span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4 border-success/30 bg-success/10">
              <Shield className="w-3 h-3 mr-2 text-success" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Growth Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with a 14-day free trial. Pay in INR with UPI, GPay, PayU, or Cashfree.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                      : plan.popular
                      ? 'border-primary/50'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-primary-foreground px-4">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl mb-1">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        selectedPlan === plan.id
                          ? 'bg-gradient-primary text-primary-foreground'
                          : ''
                      }`}
                      variant={selectedPlan === plan.id ? 'default' : 'outline'}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      {selectedPlan && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 px-6"
        >
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-8">
              Choose Payment Method
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPayment === method.id
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <CardContent className="p-4 text-center">
                    <method.icon className={`w-8 h-8 mx-auto mb-2 ${
                      selectedPayment === method.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="font-medium text-sm">{method.name}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-12"
                onClick={handlePayment}
                disabled={!selectedPayment || processing}
              >
                {processing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Complete Payment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                🔒 Secure payment powered by Indian payment gateways
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Pricing;
