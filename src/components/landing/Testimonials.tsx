import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechCorp Inc.",
        content: "DigitalHub transformed our marketing operations. We've seen a 300% increase in campaign efficiency and our ROI has never been better.",
        rating: 5,
        avatar: "SJ"
    },
    {
        name: "Michael Chen",
        role: "CEO",
        company: "Growth Ventures",
        content: "The AI-powered automation saved us countless hours. What used to take days now takes minutes. Absolutely game-changing!",
        rating: 5,
        avatar: "MC"
    },
    {
        name: "Priya Sharma",
        role: "Digital Marketing Manager",
        company: "E-Commerce Plus",
        content: "Best investment we've made. The analytics are incredibly detailed and the payment integration is seamless. Highly recommended!",
        rating: 5,
        avatar: "PS"
    },
    {
        name: "David Martinez",
        role: "Founder",
        company: "Startup Hub",
        content: "From startup to scale-up, DigitalHub grew with us. The platform is intuitive, powerful, and the support team is amazing.",
        rating: 5,
        avatar: "DM"
    },
    {
        name: "Emily Watson",
        role: "Head of Marketing",
        company: "Global Brands",
        content: "We manage campaigns across 15 countries. DigitalHub makes it effortless. The multi-channel support is unmatched.",
        rating: 5,
        avatar: "EW"
    },
    {
        name: "Raj Patel",
        role: "Marketing Consultant",
        company: "Digital Solutions",
        content: "I recommend DigitalHub to all my clients. It's the most comprehensive platform I've used, and the results speak for themselves.",
        rating: 5,
        avatar: "RP"
    }
];

export const Testimonials = () => {
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
                        Loved by <span className="gradient-text">10,000+</span> Marketers
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        See what our customers have to say about transforming their marketing with DigitalHub
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card variant="elevated" className="h-full hover:shadow-glow-secondary transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                                        ))}
                                    </div>

                                    <div className="relative mb-4">
                                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                                        <p className="text-muted-foreground pl-6">{testimonial.content}</p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                                        <Avatar>
                                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                                                {testimonial.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
