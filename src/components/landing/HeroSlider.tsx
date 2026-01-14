import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "Transform Your Digital Marketing",
    subtitle: "All-in-one platform for modern marketers",
    description: "Manage campaigns, track analytics, and grow your business with AI-powered tools",
    cta: "Start Free Trial",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    title: "AI-Powered Campaign Management",
    subtitle: "Smart automation that works for you",
    description: "Create, optimize, and scale campaigns with intelligent automation and insights",
    cta: "Explore Features",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "Real-Time Analytics & Insights",
    subtitle: "Data-driven decisions made easy",
    description: "Track performance, understand your audience, and optimize ROI with powerful analytics",
    cta: "View Analytics",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Seamless Payment Integration",
    subtitle: "Accept payments effortlessly",
    description: "Integrated PayU and Cashfree support for smooth transactions across India",
    cta: "See Pricing",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    title: "Scale Your Business Effortlessly",
    subtitle: "Built for growth",
    description: "From startup to enterprise, our platform grows with your business needs",
    cta: "Get Started",
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "Join 10,000+ Happy Marketers",
    subtitle: "Trusted by leading brands",
    description: "Join thousands of marketers who have transformed their digital presence with DigitalHub",
    cta: "Join Now",
    gradient: "from-indigo-500 to-purple-600"
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${slides[currentSlide].gradient} text-white text-sm font-semibold mb-4`}
              >
                {slides[currentSlide].subtitle}
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold gradient-text"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 justify-center"
              >
                <Button
                  variant="gradient"
                  size="lg"
                  className="gap-2"
                  onClick={() => navigate('/signup')}
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/pricing')}>
                  View Pricing
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
