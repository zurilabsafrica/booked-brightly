import { motion } from 'framer-motion';
import { Book } from '@/data/books';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { items, addToCart, removeFromCart } = useCart();
  const isInCart = items.some(item => item.book.id === book.id);

  const savingsPercent = Math.round((1 - book.rentalPrice / book.retailPrice) * 100);

  const getStockStatus = () => {
    if (book.stock > 50) return { variant: 'available' as const, label: 'In Stock' };
    if (book.stock > 10) return { variant: 'low-stock' as const, label: 'Low Stock' };
    return { variant: 'out-of-stock' as const, label: 'Out of Stock' };
  };

  const stockStatus = getStockStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="interactive" className="h-full overflow-hidden group">
        {/* Book Cover Placeholder */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-50" />
          <div className="relative text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{book.subject.charAt(0)}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground line-clamp-2">
              {book.title}
            </p>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {book.kicdApproved && (
              <Badge variant="kicd" className="gap-1">
                <ShieldCheck className="w-3 h-3" />
                KICD
              </Badge>
            )}
            <Badge variant="grade">Grade {book.grade}</Badge>
          </div>

          {/* Discount Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="accent" className="font-bold">
              Save {savingsPercent}%
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="font-display font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          
          {/* Publisher & Edition */}
          <p className="text-sm text-muted-foreground mb-3">
            {book.publisher} • {book.edition}
          </p>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-primary">
              KES {book.rentalPrice.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              KES {book.retailPrice.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">/year</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
            <span className="text-xs text-muted-foreground">{book.stock} available</span>
          </div>

          {/* Action Button */}
          <Button
            variant={isInCart ? 'secondary' : 'hero'}
            className="w-full"
            onClick={() => isInCart ? removeFromCart(book.id) : addToCart(book)}
            disabled={book.stock === 0}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookCard;
