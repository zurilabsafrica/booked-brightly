import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books, subjects, grades } from '@/data/books';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, BookOpen } from 'lucide-react';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(
    searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : null
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGrade = selectedGrade === null || book.grade === selectedGrade;
      const matchesSubject = selectedSubject === null || book.subject === selectedSubject;

      return matchesSearch && matchesGrade && matchesSubject;
    });
  }, [searchQuery, selectedGrade, selectedSubject]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGrade(null);
    setSelectedSubject(null);
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedGrade || selectedSubject;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Book Catalog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of KICD-approved textbooks. All books available for yearly rental at up to 65% savings.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, subject, or publisher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
              <Button
                variant={showFilters ? 'default' : 'outline'}
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="hidden md:flex"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden h-12 w-12"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>

            {/* Filter Pills */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card rounded-xl border border-border p-4 space-y-4"
              >
                {/* Grade Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Filter by Grade
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {grades.map((grade) => (
                      <Button
                        key={grade}
                        variant={selectedGrade === grade ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                      >
                        Grade {grade}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Filter by Subject
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.slice(0, 5).map((subject) => (
                      <Button
                        key={subject}
                        variant={selectedSubject === subject ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                      >
                        {subject}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedGrade && (
                  <Badge variant="secondary" className="gap-1">
                    Grade {selectedGrade}
                    <button onClick={() => setSelectedGrade(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedSubject && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedSubject}
                    <button onClick={() => setSelectedSubject(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredBooks.length}</span> books
            </p>
          </div>

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No books found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
