import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Share2,
  BarChart3,
  Mail,
  Users,
  Zap,
  TrendingUp,
  Globe,
  Shield,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  Layers,
  ChevronRight,
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Search,
      title: "SEO Management",
      description: "Keyword tracking, backlink analysis, and AI-powered optimization suggestions.",
      color: "text-primary",
    },
    {
      icon: Share2,
      title: "Social Media",
      description: "Schedule posts across all platforms with smart timing and analytics.",
      color: "text-secondary",
    },
    {
      icon: Target,
      title: "Ad Campaigns",
      description: "Manage Google & Meta Ads with real-time ROAS tracking.",
      color: "text-success",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Automated workflows, drip campaigns, and behavioral triggers.",
      color: "text-warning",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Unified dashboard with actionable insights across all channels.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Client Portal",
      description: "White-label reporting and multi-client management for agencies.",
      color: "text-secondary",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small businesses and solopreneurs",
      features: [
        "Up to 3 social accounts",
        "Basic SEO tools",
        "1,000 email sends/month",
        "7-day analytics history",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$149",
      period: "/month",
      description: "For growing teams and marketing professionals",
      features: [
        "Up to 15 social accounts",
        "Advanced SEO & keyword tracking",
        "25,000 email sends/month",
        "90-day analytics history",
        "Google & Meta Ads integration",
        "Priority support",
        "Custom reports",
      ],
      popular: true,
    },
    {
      name: "Agency",
      price: "$399",
      period: "/month",
      description: "For agencies managing multiple clients",
      features: [
        "Unlimited social accounts",
        "Full SEO suite with competitor analysis",
        "100,000 email sends/month",
        "Unlimited analytics history",
        "All ad platform integrations",
        "White-label reporting",
        "Client portal access",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "$2B+", label: "Ad Spend Managed" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "Customer Rating" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="DigitalHub" className="w-10 h-10" />
              <span className="text-xl font-bold">DigitalHub</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Login</Link>
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground" asChild>
                <Link to="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="container relative mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/30 bg-primary/10">
              <Sparkles className="w-3 h-3 mr-2 text-primary" />
              Now with AI-Powered Recommendations
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Your Digital Marketing{" "}
              <span className="gradient-text">Command Center</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Manage SEO, social media, ad campaigns, and email marketing from one powerful platform.
              Stop switching tools. Start growing faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8" asChild>
                <Link to="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                Watch Demo
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
              <div className="relative rounded-2xl border border-border overflow-hidden shadow-2xl glass">
                <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="p-6 bg-card/80">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {[
                      { label: "Revenue", value: "$124,563", change: "+12.5%" },
                      { label: "Visitors", value: "48,392", change: "+8.2%" },
                      { label: "Conversions", value: "2,845", change: "-2.4%" },
                      { label: "ROAS", value: "4.2x", change: "+15.3%" },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-muted/50 rounded-lg p-4">
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                        <div className="text-lg font-bold">{metric.value}</div>
                        <div className={`text-xs ${metric.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-primary/40" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-secondary/30 bg-secondary/10">
              <Zap className="w-3 h-3 mr-2 text-secondary" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Dominate</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One platform to manage your entire digital marketing stack. No more tool-switching,
              no more data silos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by leading marketing teams worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["Stripe", "Vercel", "Notion", "Linear", "Figma", "Framer"].map((company) => (
              <div key={company} className="text-2xl font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-success/30 bg-success/10">
              <Shield className="w-3 h-3 mr-2 text-success" />
              Simple Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Plans That <span className="gradient-text">Scale With You</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={plan.popular ? "md:-mt-4" : ""}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/50'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-primary-foreground px-4">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link to="/dashboard">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="gradient-text">Marketing?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of marketers who have streamlined their workflow and boosted their ROI with DigitalHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8" asChild>
                <Link to="/dashboard">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/10">
                Talk to Sales
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="DigitalHub" className="w-8 h-8 rounded-lg" />
                <span className="text-lg font-bold">DigitalHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The all-in-one digital marketing platform for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 DigitalHub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
