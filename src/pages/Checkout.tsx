import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CheckoutForm } from '@/components/payment';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [planDetails, setPlanDetails] = useState({
    name: 'pro',
    price: 999,
    features: [
      'Unlimited campaigns',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'API access',
    ],
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Get plan from URL params
    const plan = searchParams.get('plan') || 'pro';
    
    // Define plan details
    const plans: Record<string, typeof planDetails> = {
      starter: {
        name: 'starter',
        price: 499,
        features: [
          '10 campaigns per month',
          'Basic analytics',
          'Email support',
          'Standard integrations',
        ],
      },
      pro: {
        name: 'pro',
        price: 999,
        features: [
          'Unlimited campaigns',
          'Advanced analytics',
          'Priority support',
          'Custom integrations',
          'API access',
        ],
      },
      enterprise: {
        name: 'enterprise',
        price: 2499,
        features: [
          'Everything in Pro',
          'Dedicated account manager',
          '24/7 phone support',
          'Custom development',
          'SLA guarantee',
          'White-label options',
        ],
      },
    };

    setPlanDetails(plans[plan] || plans.pro);
  }, [searchParams, user, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/pricing')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
            <p className="text-muted-foreground">
              Secure checkout powered by industry-leading payment gateways
            </p>
          </div>
        </motion.div>

        {/* Checkout Form */}
        <CheckoutForm
          planName={planDetails.name}
          planPrice={planDetails.price}
          planFeatures={planDetails.features}
        />
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
