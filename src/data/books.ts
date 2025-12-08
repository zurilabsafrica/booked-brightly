// Book catalog data for Kitabu platform
export interface Book {
  id: string;
  title: string;
  subject: string;
  grade: number;
  isbn: string;
  publisher: string;
  edition: string;
  kicdApproved: boolean;
  retailPrice: number;
  rentalPrice: number;
  stock: number;
  condition: 'new' | 'good' | 'fair';
  coverImage?: string;
}

export interface GradeBundle {
  grade: number;
  name: string;
  books: Book[];
  totalRetail: number;
  bundlePrice: number;
  savingsPercent: number;
}

export const books: Book[] = [
  {
    id: 'math-g1-001',
    title: 'Primary Mathematics Book 1',
    subject: 'Mathematics',
    grade: 1,
    isbn: '978-9966-25-001-1',
    publisher: 'Kenya Literature Bureau',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 850,
    rentalPrice: 340,
    stock: 145,
    condition: 'new',
  },
  {
    id: 'eng-g1-001',
    title: 'English Activities Book 1',
    subject: 'English',
    grade: 1,
    isbn: '978-9966-25-002-8',
    publisher: 'Oxford University Press',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 780,
    rentalPrice: 312,
    stock: 120,
    condition: 'new',
  },
  {
    id: 'kis-g1-001',
    title: 'Kiswahili Shughuli Kitabu 1',
    subject: 'Kiswahili',
    grade: 1,
    isbn: '978-9966-25-003-5',
    publisher: 'Longhorn Publishers',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 720,
    rentalPrice: 288,
    stock: 98,
    condition: 'new',
  },
  {
    id: 'sci-g1-001',
    title: 'Environmental Activities Book 1',
    subject: 'Science',
    grade: 1,
    isbn: '978-9966-25-004-2',
    publisher: 'Kenya Literature Bureau',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 680,
    rentalPrice: 272,
    stock: 67,
    condition: 'new',
  },
  {
    id: 'math-g2-001',
    title: 'Primary Mathematics Book 2',
    subject: 'Mathematics',
    grade: 2,
    isbn: '978-9966-25-011-0',
    publisher: 'Kenya Literature Bureau',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 890,
    rentalPrice: 356,
    stock: 134,
    condition: 'new',
  },
  {
    id: 'eng-g2-001',
    title: 'English Activities Book 2',
    subject: 'English',
    grade: 2,
    isbn: '978-9966-25-012-7',
    publisher: 'Oxford University Press',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 820,
    rentalPrice: 328,
    stock: 112,
    condition: 'new',
  },
  {
    id: 'kis-g2-001',
    title: 'Kiswahili Shughuli Kitabu 2',
    subject: 'Kiswahili',
    grade: 2,
    isbn: '978-9966-25-013-4',
    publisher: 'Longhorn Publishers',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 760,
    rentalPrice: 304,
    stock: 89,
    condition: 'new',
  },
  {
    id: 'sci-g2-001',
    title: 'Environmental Activities Book 2',
    subject: 'Science',
    grade: 2,
    isbn: '978-9966-25-014-1',
    publisher: 'Kenya Literature Bureau',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 720,
    rentalPrice: 288,
    stock: 78,
    condition: 'new',
  },
  {
    id: 'math-g3-001',
    title: 'Primary Mathematics Book 3',
    subject: 'Mathematics',
    grade: 3,
    isbn: '978-9966-25-021-9',
    publisher: 'Kenya Literature Bureau',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 950,
    rentalPrice: 380,
    stock: 156,
    condition: 'new',
  },
  {
    id: 'eng-g3-001',
    title: 'English Activities Book 3',
    subject: 'English',
    grade: 3,
    isbn: '978-9966-25-022-6',
    publisher: 'Oxford University Press',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 880,
    rentalPrice: 352,
    stock: 128,
    condition: 'new',
  },
  {
    id: 'kis-g3-001',
    title: 'Kiswahili Shughuli Kitabu 3',
    subject: 'Kiswahili',
    grade: 3,
    isbn: '978-9966-25-023-3',
    publisher: 'Longhorn Publishers',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 800,
    rentalPrice: 320,
    stock: 95,
    condition: 'new',
  },
  {
    id: 'sci-g3-001',
    title: 'Science & Technology Book 3',
    subject: 'Science',
    grade: 3,
    isbn: '978-9966-25-024-0',
    publisher: 'Kenya Literature Bureau',
    edition: '2024',
    kicdApproved: true,
    retailPrice: 780,
    rentalPrice: 312,
    stock: 82,
    condition: 'new',
  },
];

export const getBooksByGrade = (grade: number): Book[] => {
  return books.filter(book => book.grade === grade);
};

export const getGradeBundle = (grade: number): GradeBundle => {
  const gradeBooks = getBooksByGrade(grade);
  const totalRetail = gradeBooks.reduce((sum, book) => sum + book.retailPrice, 0);
  const bundlePrice = Math.round(totalRetail * 0.35); // 35% of retail = 65% savings
  
  return {
    grade,
    name: `Grade ${grade} Complete Bundle`,
    books: gradeBooks,
    totalRetail,
    bundlePrice,
    savingsPercent: Math.round((1 - bundlePrice / totalRetail) * 100),
  };
};

export const subjects = ['Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies', 'CRE', 'Creative Arts'];

export const grades = [1, 2, 3, 4, 5, 6, 7, 8];
