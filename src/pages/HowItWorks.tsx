import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  CreditCard, 
  Truck, 
  RefreshCw,
  ShieldCheck,
  Clock,
  Smartphone,
  HelpCircle
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Booklist',
      description: 'Take a photo of your school booklist or enter your child\'s grade. Our system automatically matches books from our catalog.',
      details: [
        'Supports all CBC and 8-4-4 curricula',
        'Auto-detection of KICD-approved books',
        'Instant availability check',
      ],
    },
    {
      icon: Search,
      title: 'Select Your Books',
      description: 'Choose individual books or save more with complete grade bundles. All books are KICD-approved and in excellent condition.',
      details: [
        'Filter by grade, subject, or publisher',
        'View book condition ratings',
        'Compare bundle vs individual pricing',
      ],
    },
    {
      icon: CreditCard,
      title: 'Pay Securely',
      description: 'Complete payment via M-Pesa STK push or card. Add optional damage protection for worry-free usage.',
      details: [
        'Instant M-Pesa confirmation',
        'Card payments supported',
        'Flexible payment options for schools',
      ],
    },
    {
      icon: Truck,
      title: 'Receive Delivery',
      description: 'Books delivered to your doorstep within 3-5 business days. Track your order in real-time via SMS and app.',
      details: [
        'Free delivery across Kenya',
        'Real-time tracking',
        'Signature on delivery',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Return at Year End',
      description: 'We collect books at the end of the school year. Automatic renewal reminders ensure you\'re ready for next term.',
      details: [
        'Free pickup service',
        'Condition assessment on return',
        'Early renewal discounts',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What if a book gets damaged?',
      answer: 'With our optional damage protection plan (+15%), you\'re covered for accidental damage and loss. Without protection, you\'ll pay the repair or replacement cost.',
    },
    {
      question: 'How long is the rental period?',
      answer: 'All rentals are for one full academic year. You can return books at any time, but no refunds for early returns.',
    },
    {
      question: 'What condition are the books in?',
      answer: 'All books are quality-checked before delivery. We rate books as New, Good, or Fair - all are suitable for classroom use with no missing pages.',
    },
    {
      question: 'Can I renew my rental?',
      answer: 'Yes! We send automatic reminders before the school year ends. Renewing early gets you priority delivery for the new term.',
    },
    {
      question: 'Do you deliver outside Nairobi?',
      answer: 'Yes, we deliver across Kenya. Nairobi orders arrive in 2-3 days, other counties in 4-7 days.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="accent" className="mb-4">Simple & Transparent</Badge>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                How Kitabu Works
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get quality textbooks for your children at a fraction of the cost. Our process is designed to be simple, fast, and hassle-free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="elevated" className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Step Number & Icon */}
                        <div className="bg-primary/5 p-6 md:p-8 flex md:flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                              {idx + 1}
                            </div>
                            <step.icon className="w-6 h-6 text-primary md:hidden" />
                          </div>
                          <step.icon className="w-10 h-10 text-primary hidden md:block" />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex-1">
                          <h3 className="font-display text-xl font-bold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {step.description}
                          </p>
                          <ul className="space-y-2">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="w-4 h-4 text-success flex-shrink-0" />
                                <span className="text-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Parents Love Kitabu
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: 'Save Time',
                  description: 'No more rushing between bookshops. Upload your booklist and we handle the rest.',
                },
                {
                  icon: Smartphone,
                  title: 'Pay via M-Pesa',
                  description: 'Quick and secure M-Pesa payment. No need for bank accounts or cards.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Quality Guaranteed',
                  description: 'All books are inspected and KICD-approved. Replacements for any issues.',
                },
              ].map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
