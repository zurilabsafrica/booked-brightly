import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import heroImage from '@/assets/hero-students.jpg';

const HeroSection = () => {
  const stats = [
    { value: '10,000+', label: 'Happy Families' },
    { value: '500+', label: 'Schools Partner' },
    { value: '35%', label: 'Average Savings' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-40 right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge variant="kicd" className="px-3 py-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 mr-1" />
                KICD Approved Books
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Rent Textbooks,{' '}
              <span className="text-gradient-hero">Save Up to 65%</span>{' '}
              Every Year
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Quality KICD-approved textbooks delivered to your door. Return at year end, no hassle. Join thousands of Kenyan families saving on school books.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link to="/onboarding">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Saving Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Browse Catalog
                </Button>
              </Link>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Truck, label: 'Free Delivery' },
                { icon: RefreshCw, label: 'Easy Returns' },
                { icon: ShieldCheck, label: 'Damage Protection' },
              ].map((prop, idx) => (
                <motion.div
                  key={prop.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border"
                >
                  <prop.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium text-foreground text-center">{prop.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Happy Kenyan students with textbooks in classroom"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 left-4 right-4 md:left-8 md:right-8 bg-card rounded-xl shadow-xl p-4 border border-border"
            >
              <div className="flex items-center justify-between">
                {stats.map((stat, idx) => (
                  <div key={stat.label} className="text-center px-2">
                    <p className="font-display text-xl md:text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Review Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-3 border border-border hidden md:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-medium">4.9/5</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">from 2,500+ reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
