import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Zap,
    Shield,
    TrendingUp,
    Users,
    Clock,
    Award,
    Globe,
    HeartHandshake
} from 'lucide-react';

const reasons = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Optimized performance ensures your campaigns load instantly and run smoothly",
        stat: "99.9% Uptime"
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-level encryption and compliance with international security standards",
        stat: "SOC 2 Certified"
    },
    {
        icon: TrendingUp,
        title: "Proven Results",
        description: "Our customers see an average 300% increase in campaign efficiency",
        stat: "300% ROI"
    },
    {
        icon: Users,
        title: "Expert Support",
        description: "Dedicated support team available 24/7 to help you succeed",
        stat: "<5min Response"
    },
    {
        icon: Clock,
        title: "Save Time",
        description: "Automation and AI reduce manual work by up to 80%",
        stat: "80% Time Saved"
    },
    {
        icon: Award,
        title: "Industry Leader",
        description: "Trusted by 10,000+ marketers and recognized by industry experts",
        stat: "10,000+ Users"
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Manage campaigns across multiple countries and languages seamlessly",
        stat: "50+ Countries"
    },
    {
        icon: HeartHandshake,
        title: "Customer First",
        description: "We're committed to your success with personalized onboarding and training",
        stat: "98% Satisfaction"
    }
];

export const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Why Choose <span className="gradient-text">DigitalHub</span>?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're not just another marketing platform. We're your partner in growth.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card variant="elevated" className="h-full hover:shadow-glow-primary transition-all group">
                                <CardContent className="p-6">
                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <reason.icon className="h-7 w-7 text-white" />
                                    </div>

                                    <Badge className="mb-3 bg-primary/10 text-primary">
                                        {reason.stat}
                                    </Badge>

                                    <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-8 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                        <div className="text-center">
                            <p className="text-4xl font-bold gradient-text">10,000+</p>
                            <p className="text-sm text-muted-foreground">Active Users</p>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div className="text-center">
                            <p className="text-4xl font-bold gradient-text">50M+</p>
                            <p className="text-sm text-muted-foreground">Campaigns Managed</p>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div className="text-center">
                            <p className="text-4xl font-bold gradient-text">98%</p>
                            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div className="text-center">
                            <p className="text-4xl font-bold gradient-text">24/7</p>
                            <p className="text-sm text-muted-foreground">Support Available</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
