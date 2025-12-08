import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { grades, getBooksByGrade, Book } from '@/data/books';
import { useCart } from '@/contexts/CartContext';
import { 
  Upload, 
  Camera, 
  ArrowRight, 
  ArrowLeft,
  Check,
  User,
  GraduationCap,
  Book as BookIcon,
  ShieldCheck,
  ShoppingCart
} from 'lucide-react';
import { toast } from 'sonner';

interface StudentInfo {
  name: string;
  grade: number | null;
  school: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const [step, setStep] = useState(1);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    grade: null,
    school: '',
  });
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [addProtection, setAddProtection] = useState(true);

  const totalSteps = 4;

  const handleGradeSelect = (grade: number) => {
    setStudentInfo({ ...studentInfo, grade });
    const gradeBooks = getBooksByGrade(grade);
    setSelectedBooks(gradeBooks);
  };

  const toggleBook = (book: Book) => {
    setSelectedBooks(prev => 
      prev.some(b => b.id === book.id)
        ? prev.filter(b => b.id !== book.id)
        : [...prev, book]
    );
  };

  const handleAddToCart = () => {
    selectedBooks.forEach(book => {
      if (!items.some(item => item.book.id === book.id)) {
        addToCart(book, addProtection);
      }
    });
    toast.success(`${selectedBooks.length} books added to cart!`);
    navigate('/cart');
  };

  const totalRental = selectedBooks.reduce((sum, book) => sum + book.rentalPrice, 0);
  const totalRetail = selectedBooks.reduce((sum, book) => sum + book.retailPrice, 0);
  const savings = totalRetail - totalRental;

  const canProceed = () => {
    switch (step) {
      case 1: return studentInfo.name.length >= 2;
      case 2: return studentInfo.grade !== null;
      case 3: return selectedBooks.length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {step === 1 && 'Student Info'}
                {step === 2 && 'Select Grade'}
                {step === 3 && 'Choose Books'}
                {step === 4 && 'Review'}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-hero rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Student Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Let's Get Started
                  </h1>
                  <p className="text-muted-foreground">
                    Enter your child's details to find the right books
                  </p>
                </div>

                <Card variant="elevated">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Student's Name
                      </label>
                      <Input
                        placeholder="e.g., John Kamau"
                        value={studentInfo.name}
                        onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        School Name (Optional)
                      </label>
                      <Input
                        placeholder="e.g., Nairobi Primary School"
                        value={studentInfo.school}
                        onChange={(e) => setStudentInfo({ ...studentInfo, school: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Booklist Upload Option */}
                <Card variant="flat" className="mt-4 border-dashed border-2">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Booklist
                      </Button>
                      <span className="text-muted-foreground">or</span>
                      <Button variant="outline" className="gap-2">
                        <Camera className="w-4 h-4" />
                        Take Photo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Upload your school's booklist for automatic matching
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Grade Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Select Grade
                  </h1>
                  <p className="text-muted-foreground">
                    Choose {studentInfo.name}'s current grade level
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {grades.map((grade) => (
                    <motion.button
                      key={grade}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGradeSelect(grade)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        studentInfo.grade === grade
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl font-bold text-primary mb-1">{grade}</div>
                      <div className="text-sm text-muted-foreground">Grade {grade}</div>
                      {studentInfo.grade === grade && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <Check className="w-5 h-5 text-success mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Book Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <BookIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Choose Books
                  </h1>
                  <p className="text-muted-foreground">
                    Select the books for Grade {studentInfo.grade}
                  </p>
                </div>

                {/* All Books Selected Toggle */}
                <Card variant="featured" className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">Complete Grade Bundle</p>
                        <p className="text-sm text-muted-foreground">All {getBooksByGrade(studentInfo.grade!).length} books selected</p>
                      </div>
                      <Badge variant="accent">Recommended</Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {getBooksByGrade(studentInfo.grade!).map((book) => {
                    const isSelected = selectedBooks.some(b => b.id === book.id);
                    return (
                      <motion.button
                        key={book.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleBook(book)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              {isSelected ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-bold">{book.subject.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{book.title}</p>
                              <p className="text-sm text-muted-foreground">{book.publisher}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">KES {book.rentalPrice}</p>
                            <p className="text-xs text-muted-foreground line-through">KES {book.retailPrice}</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/10 flex items-center justify-center">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Review & Confirm
                  </h1>
                  <p className="text-muted-foreground">
                    Review your selection before adding to cart
                  </p>
                </div>

                {/* Summary Card */}
                <Card variant="elevated" className="mb-4">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div>
                        <p className="font-semibold text-foreground">{studentInfo.name}</p>
                        <p className="text-sm text-muted-foreground">Grade {studentInfo.grade} • {studentInfo.school || 'School not specified'}</p>
                      </div>
                      <Badge variant="grade">Grade {studentInfo.grade}</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      {selectedBooks.map((book) => (
                        <div key={book.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{book.title}</span>
                          <span className="font-medium">KES {book.rentalPrice}</span>
                        </div>
                      ))}
                    </div>

                    {/* Protection Option */}
                    <button
                      onClick={() => setAddProtection(!addProtection)}
                      className={`w-full p-3 rounded-lg border-2 transition-all mb-4 ${
                        addProtection
                          ? 'border-success bg-success/5'
                          : 'border-border hover:border-success/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className={`w-5 h-5 ${addProtection ? 'text-success' : 'text-muted-foreground'}`} />
                          <div className="text-left">
                            <p className="font-medium text-foreground text-sm">Damage Protection</p>
                            <p className="text-xs text-muted-foreground">Cover accidental damage & loss</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">+15%</p>
                          {addProtection && <Check className="w-4 h-4 text-success inline" />}
                        </div>
                      </div>
                    </button>

                    {/* Totals */}
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>KES {totalRental.toLocaleString()}</span>
                      </div>
                      {addProtection && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Protection (+15%)</span>
                          <span>KES {Math.round(totalRental * 0.15).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-success">
                        <span>You Save</span>
                        <span>KES {savings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">
                          KES {(totalRental + (addProtection ? Math.round(totalRental * 0.15) : 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
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
              <Button variant="hero" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Onboarding;
