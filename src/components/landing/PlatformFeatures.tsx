import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  Target,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Globe,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time insights and comprehensive reporting to track your campaign performance"
  },
  {
    icon: Target,
    title: "Campaign Management",
    description: "Create, manage, and optimize campaigns across multiple channels effortlessly"
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "Smart automation that learns from your data and optimizes campaigns automatically"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and security measures to protect your data"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team with role-based access and permissions"
  },
  {
    icon: TrendingUp,
    title: "ROI Optimization",
    description: "Maximize your return on investment with data-driven recommendations"
  },
  {
    icon: Globe,
    title: "Multi-Channel Support",
    description: "Manage campaigns across social media, email, SEO, and more from one platform"
  },
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Generate engaging content for your campaigns with AI assistance"
  }
];

export const PlatformFeatures = () => {
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
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you grow your business and achieve your marketing goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full hover:shadow-glow-primary transition-all">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
