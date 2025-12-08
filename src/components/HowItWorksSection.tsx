import { motion } from 'framer-motion';
import { Upload, Search, CreditCard, Truck, RefreshCw } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Booklist',
      description: "Take a photo of your school's booklist or enter your child's grade. We'll match you to the right books instantly.",
      color: 'bg-primary',
    },
    {
      icon: Search,
      title: 'Choose Your Books',
      description: 'Browse our KICD-approved catalog. Rent individual books or save more with grade bundles.',
      color: 'bg-accent',
    },
    {
      icon: CreditCard,
      title: 'Pay via M-Pesa',
      description: 'Simple, secure payment via M-Pesa STK push. Add optional damage protection for peace of mind.',
      color: 'bg-success',
    },
    {
      icon: Truck,
      title: 'Get Delivered',
      description: 'Books delivered to your door within 3-5 days. Track your order in real-time.',
      color: 'bg-info',
    },
    {
      icon: RefreshCw,
      title: 'Return at Year End',
      description: "We'll collect books at the end of the school year. Automatic renewal reminders before next term.",
      color: 'bg-primary',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Kitabu Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting affordable textbooks has never been easier. Follow these simple steps to start saving.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-border hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <motion.div 
                  className="relative z-10 mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border-2 border-border flex items-center justify-center text-sm font-bold text-foreground shadow">
                    {idx + 1}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
