import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  ShieldCheck, 
  ArrowLeft, 
  CreditCard,
  Truck,
  ShoppingBag,
  Smartphone
} from 'lucide-react';

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateProtection, 
    clearCart,
    subtotal, 
    protectionTotal, 
    grandTotal 
  } = useCart();

  const deliveryFee = items.length > 0 ? 250 : 0;
  const finalTotal = grandTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-muted-foreground mb-6">
                Start adding textbooks to save on your child's education
              </p>
              <Link to="/catalog">
                <Button variant="hero" size="lg">
                  Browse Catalog
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Your Cart
                </h1>
                <p className="text-muted-foreground">
                  {items.length} book{items.length > 1 ? 's' : ''} for yearly rental
                </p>
              </div>
              <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
                Clear All
              </Button>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card variant="elevated">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Book Thumbnail */}
                          <div className="w-16 h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-bold text-primary">
                              {item.book.subject.charAt(0)}
                            </span>
                          </div>

                          {/* Book Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-foreground line-clamp-1">
                                  {item.book.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {item.book.publisher} • Grade {item.book.grade}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.book.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                {item.book.kicdApproved && (
                                  <Badge variant="kicd" className="text-xs">KICD</Badge>
                                )}
                                <Badge variant="condition" className="text-xs capitalize">
                                  {item.book.condition}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">
                                  KES {item.book.rentalPrice.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground line-through">
                                  KES {item.book.retailPrice.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Protection Toggle */}
                            <button
                              onClick={() => updateProtection(item.book.id, !item.protectionPlan)}
                              className={`mt-3 w-full p-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                                item.protectionPlan
                                  ? 'bg-success/10 border border-success/30'
                                  : 'bg-muted border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <ShieldCheck className={`w-4 h-4 ${item.protectionPlan ? 'text-success' : 'text-muted-foreground'}`} />
                                <span className={item.protectionPlan ? 'text-success' : 'text-muted-foreground'}>
                                  Damage Protection
                                </span>
                              </div>
                              <span className="font-medium">
                                +KES {Math.round(item.book.rentalPrice * 0.15)}
                              </span>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky top-24"
                >
                  <Card variant="elevated">
                    <CardContent className="p-6">
                      <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                        Order Summary
                      </h2>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal ({items.length} books)</span>
                          <span>KES {subtotal.toLocaleString()}</span>
                        </div>
                        {protectionTotal > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Damage Protection</span>
                            <span>KES {protectionTotal.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Delivery</span>
                          <span>KES {deliveryFee.toLocaleString()}</span>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-primary">KES {finalTotal.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            For 1 year rental period
                          </p>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Button variant="hero" size="lg" className="w-full mb-3">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Pay with M-Pesa
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay with Card
                      </Button>

                      {/* Delivery Info */}
                      <div className="mt-6 p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">
                            Delivery in <strong className="text-foreground">3-5 days</strong> across Kenya
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Link to="/catalog" className="block mt-4">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
