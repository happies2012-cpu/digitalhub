import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
    {
        name: "Starter",
        price: 499,
        description: "Perfect for small businesses",
        features: [
            { name: "10 campaigns/month", included: true },
            { name: "Basic analytics", included: true },
            { name: "Email support", included: true },
            { name: "2 team members", included: true },
            { name: "Standard integrations", included: true },
            { name: "AI automation", included: false },
            { name: "Priority support", included: false },
            { name: "Custom integrations", included: false },
            { name: "API access", included: false },
            { name: "White-label", included: false }
        ]
    },
    {
        name: "Pro",
        price: 999,
        description: "Most popular for growing teams",
        recommended: true,
        features: [
            { name: "Unlimited campaigns", included: true },
            { name: "Advanced analytics", included: true },
            { name: "Priority support", included: true },
            { name: "10 team members", included: true },
            { name: "All integrations", included: true },
            { name: "AI automation", included: true },
            { name: "API access", included: true },
            { name: "Custom reports", included: true },
            { name: "Multi-channel", included: true },
            { name: "White-label", included: false }
        ]
    },
    {
        name: "Enterprise",
        price: 2499,
        description: "For large organizations",
        features: [
            { name: "Everything in Pro", included: true },
            { name: "Dedicated manager", included: true },
            { name: "24/7 phone support", included: true },
            { name: "Unlimited team members", included: true },
            { name: "Custom development", included: true },
            { name: "SLA guarantee", included: true },
            { name: "White-label options", included: true },
            { name: "Advanced security", included: true },
            { name: "Training sessions", included: true },
            { name: "Priority features", included: true }
        ]
    }
];

export const PricingComparison = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Choose Your <span className="gradient-text">Perfect Plan</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Transparent pricing with no hidden fees. All plans include 14-day free trial
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <Card
                                variant="elevated"
                                className={`h-full ${plan.recommended ? 'ring-2 ring-primary shadow-glow-primary' : ''}`}
                            >
                                <CardContent className="p-8">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-4xl font-bold gradient-text">₹{plan.price}</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {plan.features.map((feature) => (
                                            <div key={feature.name} className="flex items-center gap-3">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 text-success flex-shrink-0" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                                                )}
                                                <span className={feature.included ? '' : 'text-muted-foreground/50'}>
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant={plan.recommended ? 'gradient' : 'outline'}
                                        className="w-full gap-2"
                                        size="lg"
                                        onClick={() => navigate(`/checkout?plan=${plan.name.toLowerCase()}`)}
                                    >
                                        Get Started
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">
                        All plans include 18% GST. Need a custom solution?
                    </p>
                    <Button variant="outline" onClick={() => navigate('/contact')}>
                        Contact Sales
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
