import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, School } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Parents CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              For Parents
            </h3>
            <p className="text-muted-foreground mb-6">
              Upload your child's booklist and get instant pricing. Start saving on textbooks in under 5 minutes.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Save 35-65% vs buying new',
                'Free delivery across Kenya',
                'Optional damage protection',
                'Easy end-of-year returns',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/onboarding">
              <Button variant="hero" size="lg">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Schools CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                <School className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                For Schools
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Partner with Kitabu to provide affordable textbooks for your entire student body. Bulk discounts available.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Dedicated school dashboard',
                  'Bulk order management',
                  'Class-level book distribution',
                  'Priority support & onboarding',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/schools">
                <Button variant="outline-light" size="lg">
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
