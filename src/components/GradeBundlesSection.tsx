import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getGradeBundle, grades } from '@/data/books';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowRight, Sparkles } from 'lucide-react';

const GradeBundlesSection = () => {
  // Show bundles for grades 1-4 as featured
  const featuredBundles = grades.slice(0, 4).map(getGradeBundle);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="accent" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Grade Bundles – Maximum Savings
          </h2>
          <p className="text-lg text-muted-foreground">
            Get all required textbooks for your child's grade in one convenient package with extra discounts.
          </p>
        </motion.div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBundles.map((bundle, idx) => (
            <motion.div
              key={bundle.grade}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card variant={idx === 0 ? 'featured' : 'elevated'} className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="accent" className="font-bold">
                      Save {bundle.savingsPercent}%
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">Grade {bundle.grade} Bundle</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {bundle.books.length} textbooks included
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Book List */}
                  <ul className="space-y-1 mb-4">
                    {bundle.books.slice(0, 4).map((book) => (
                      <li key={book.id} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {book.subject}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="pt-4 border-t border-border mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        KES {bundle.bundlePrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        KES {bundle.totalRetail.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">per year</p>
                  </div>

                  <Link to={`/catalog?grade=${bundle.grade}`}>
                    <Button variant="hero" className="w-full">
                      Get This Bundle
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/catalog">
            <Button variant="outline" size="lg">
              View All Grades & Books
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GradeBundlesSection;
