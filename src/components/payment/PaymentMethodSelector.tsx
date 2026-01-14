import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Wallet, CheckCircle2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
}

interface PaymentMethodSelectorProps {
  onSelect: (methodId: string) => void;
  selected?: string;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onSelect,
  selected,
}) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'payu',
      name: 'PayU',
      description: 'Credit/Debit Cards, Net Banking, UPI',
      icon: <CreditCard className="h-6 w-6" />,
      recommended: true,
    },
    {
      id: 'cashfree',
      name: 'Cashfree',
      description: 'All payment methods supported',
      icon: <Wallet className="h-6 w-6" />,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Payment Method</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selected === method.id
                  ? 'ring-2 ring-primary shadow-glow-primary'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onSelect(method.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {method.icon}
                  </div>
                  {method.recommended && (
                    <Badge className="bg-success/10 text-success">Recommended</Badge>
                  )}
                  {selected === method.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                <h4 className="font-semibold mb-1">{method.name}</h4>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
