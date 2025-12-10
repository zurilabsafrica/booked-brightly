import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Users,
  BookOpen,
  Calculator,
  ShoppingCart,
  Percent
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { grades, getBooksByGrade, Book } from '@/data/books';
import { toast } from 'sonner';

interface ClassSelection {
  grade: number;
  section: string;
  students: number;
  selected: boolean;
}

const NewBulkOrder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [classes, setClasses] = useState<ClassSelection[]>([
    { grade: 1, section: 'A', students: 35, selected: false },
    { grade: 1, section: 'B', students: 32, selected: false },
    { grade: 2, section: 'A', students: 38, selected: false },
    { grade: 2, section: 'B', students: 36, selected: false },
    { grade: 3, section: 'A', students: 34, selected: false },
    { grade: 3, section: 'B', students: 33, selected: false },
    { grade: 4, section: 'A', students: 30, selected: false },
    { grade: 4, section: 'B', students: 32, selected: false },
  ]);
  const [selectedBooks, setSelectedBooks] = useState<Map<number, Book[]>>(new Map());

  const totalSteps = 4;

  const toggleClass = (idx: number) => {
    setClasses(prev => prev.map((c, i) => 
      i === idx ? { ...c, selected: !c.selected } : c
    ));
  };

  const selectedClasses = classes.filter(c => c.selected);
  const uniqueGrades = [...new Set(selectedClasses.map(c => c.grade))];
  const totalStudents = selectedClasses.reduce((sum, c) => sum + c.students, 0);

  // Get books for selected grades
  const getAvailableBooks = () => {
    const books: Book[] = [];
    uniqueGrades.forEach(grade => {
      const gradeBooks = getBooksByGrade(grade);
      books.push(...gradeBooks);
    });
    return books;
  };

  const toggleBook = (grade: number, book: Book) => {
    setSelectedBooks(prev => {
      const newMap = new Map(prev);
      const gradeBooks = newMap.get(grade) || [];
      const exists = gradeBooks.some(b => b.id === book.id);
      
      if (exists) {
        newMap.set(grade, gradeBooks.filter(b => b.id !== book.id));
      } else {
        newMap.set(grade, [...gradeBooks, book]);
      }
      return newMap;
    });
  };

  const selectAllBooks = (grade: number) => {
    const gradeBooks = getBooksByGrade(grade);
    setSelectedBooks(prev => {
      const newMap = new Map(prev);
      newMap.set(grade, gradeBooks);
      return newMap;
    });
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalBooks = 0;
    let subtotal = 0;

    selectedClasses.forEach(cls => {
      const gradeBooks = selectedBooks.get(cls.grade) || [];
      gradeBooks.forEach(book => {
        totalBooks += cls.students;
        subtotal += book.rentalPrice * cls.students;
      });
    });

    const bulkDiscount = subtotal * 0.15; // 15% bulk discount
    const total = subtotal - bulkDiscount;

    return { totalBooks, subtotal, bulkDiscount, total };
  };

  const { totalBooks, subtotal, bulkDiscount, total } = calculateTotals();

  const handleSubmit = () => {
    toast.success('Bulk order submitted successfully!');
    navigate('/schools/orders');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedClasses.length > 0;
      case 2: return selectedBooks.size > 0;
      case 3: return true;
      default: return true;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link to="/schools/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            New Bulk Order
          </h1>
          <p className="text-muted-foreground">
            Order textbooks for multiple classes at once
          </p>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {step === 1 && 'Select Classes'}
            {step === 2 && 'Choose Books'}
            {step === 3 && 'Review Order'}
            {step === 4 && 'Confirm'}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-hero rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Classes */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Select Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Have a class list?</span>
                  </div>
                  <Button variant="outline" size="sm">Upload CSV</Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {classes.map((cls, idx) => (
                    <motion.button
                      key={`${cls.grade}-${cls.section}`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleClass(idx)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        cls.selected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">
                          Grade {cls.grade}{cls.section}
                        </span>
                        {cls.selected && (
                          <Check className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cls.students} students
                      </p>
                    </motion.button>
                  ))}
                </div>

                {selectedClasses.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium text-foreground">
                      Selected: {selectedClasses.length} classes, {totalStudents} students
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Choose Books */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {uniqueGrades.map(grade => {
              const gradeBooks = getBooksByGrade(grade);
              const selectedGradeBooks = selectedBooks.get(grade) || [];
              const allSelected = selectedGradeBooks.length === gradeBooks.length;

              return (
                <Card key={grade}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Grade {grade} Books
                      </CardTitle>
                      <Button 
                        variant={allSelected ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => selectAllBooks(grade)}
                      >
                        {allSelected ? 'All Selected' : 'Select All'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {gradeBooks.map(book => {
                        const isSelected = selectedGradeBooks.some(b => b.id === book.id);
                        return (
                          <button
                            key={book.id}
                            onClick={() => toggleBook(grade, book)}
                            className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox checked={isSelected} />
                              <div className="text-left">
                                <p className="font-medium text-foreground">{book.title}</p>
                                <p className="text-sm text-muted-foreground">{book.publisher}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">KES {book.rentalPrice}</p>
                              <p className="text-xs text-muted-foreground">per book</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Classes Summary */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Classes</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClasses.map(cls => (
                      <Badge key={`${cls.grade}-${cls.section}`} variant="secondary">
                        Grade {cls.grade}{cls.section} ({cls.students} students)
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Books Summary */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Books by Grade</h3>
                  {uniqueGrades.map(grade => {
                    const books = selectedBooks.get(grade) || [];
                    const classesInGrade = selectedClasses.filter(c => c.grade === grade);
                    const studentsInGrade = classesInGrade.reduce((sum, c) => sum + c.students, 0);

                    return (
                      <div key={grade} className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Grade {grade}</span>
                          <span className="text-sm text-muted-foreground">{studentsInGrade} students</span>
                        </div>
                        {books.map(book => (
                          <div key={book.id} className="flex justify-between text-sm py-1">
                            <span className="text-muted-foreground">{book.title}</span>
                            <span>KES {(book.rentalPrice * studentsInGrade).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Books</span>
                    <span className="font-medium">{totalBooks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span className="flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      Bulk Discount (15%)
                    </span>
                    <span>-KES {bulkDiscount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="text-center">
              <CardContent className="py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-success" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Ready to Submit
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Your order for {totalBooks.toLocaleString()} books across {selectedClasses.length} classes is ready. 
                  An invoice will be generated and sent to your school email.
                </p>
                <div className="p-4 bg-muted rounded-lg inline-block mb-6">
                  <p className="text-2xl font-bold text-primary">KES {total.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}
        
        {step < totalSteps ? (
          <Button 
            variant="hero" 
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="hero" onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-2" />
            Submit Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewBulkOrder;
