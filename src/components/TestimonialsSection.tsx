import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Mary Wanjiku',
      location: 'Nairobi',
      grade: 'Parent of Grade 3',
      content: "Kitabu saved me over KES 8,000 this year! The books arrived in perfect condition and my daughter was so excited. Will definitely renew next year.",
      rating: 5,
      avatar: 'MW',
    },
    {
      name: 'James Omondi',
      location: 'Kisumu',
      grade: 'Parent of Grade 5 & 7',
      content: "With two kids in school, textbooks were breaking my budget. Kitabu's bundle deals are a game-changer. M-Pesa payment is so convenient too.",
      rating: 5,
      avatar: 'JO',
    },
    {
      name: 'Grace Muthoni',
      location: 'Mombasa',
      grade: 'Parent of Grade 2',
      content: "I was skeptical about renting books, but the quality exceeded my expectations. The KICD approval badge gave me confidence. Highly recommend!",
      rating: 5,
      avatar: 'GM',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full pattern-dots" style={{ filter: 'invert(1)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Loved by Thousands of Kenyan Families
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Join our community of parents who are saving big on textbooks while giving their children quality education materials.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <Card className="h-full bg-card/10 backdrop-blur border-primary-foreground/20">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-accent mb-4" />

                  {/* Content */}
                  <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-primary-foreground/70">
                        {testimonial.grade} • {testimonial.location}
                      </p>
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

export default TestimonialsSection;
