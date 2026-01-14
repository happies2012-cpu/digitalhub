import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card variant="elevated" className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-destructive via-warning to-destructive" />
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center"
            >
              <XCircle className="h-10 w-10 text-destructive" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
              <p className="text-muted-foreground mb-6">
                We couldn't process your payment. Please try again or use a different payment method.
              </p>

              <div className="p-4 rounded-xl bg-muted/30 mb-6 text-left text-sm">
                <p className="font-medium mb-2">Common reasons for failure:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Insufficient funds</li>
                  <li>• Card expired or blocked</li>
                  <li>• Network connectivity issues</li>
                  <li>• Bank declined the transaction</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => navigate('/pricing')}
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2"
                  onClick={() => window.open('mailto:support@base44.com')}
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;
