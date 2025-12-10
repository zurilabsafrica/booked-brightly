import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  Search,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  User
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  admissionNo: string;
  booksReceived: number;
  totalBooks: number;
  status: 'complete' | 'partial' | 'pending';
}

interface ClassData {
  grade: number;
  section: string;
  students: Student[];
  expanded: boolean;
}

const ClassDistribution = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState<ClassData[]>([
    {
      grade: 1,
      section: 'A',
      expanded: false,
      students: [
        { id: '1', name: 'John Kamau', admissionNo: 'ADM001', booksReceived: 4, totalBooks: 4, status: 'complete' },
        { id: '2', name: 'Mary Wanjiku', admissionNo: 'ADM002', booksReceived: 4, totalBooks: 4, status: 'complete' },
        { id: '3', name: 'Peter Omondi', admissionNo: 'ADM003', booksReceived: 3, totalBooks: 4, status: 'partial' },
        { id: '4', name: 'Grace Muthoni', admissionNo: 'ADM004', booksReceived: 0, totalBooks: 4, status: 'pending' },
        { id: '5', name: 'David Kipchoge', admissionNo: 'ADM005', booksReceived: 4, totalBooks: 4, status: 'complete' },
      ],
    },
    {
      grade: 1,
      section: 'B',
      expanded: false,
      students: [
        { id: '6', name: 'Sarah Njeri', admissionNo: 'ADM006', booksReceived: 4, totalBooks: 4, status: 'complete' },
        { id: '7', name: 'James Otieno', admissionNo: 'ADM007', booksReceived: 4, totalBooks: 4, status: 'complete' },
        { id: '8', name: 'Ann Wairimu', admissionNo: 'ADM008', booksReceived: 2, totalBooks: 4, status: 'partial' },
      ],
    },
    {
      grade: 2,
      section: 'A',
      expanded: false,
      students: [
        { id: '9', name: 'Michael Kibet', admissionNo: 'ADM009', booksReceived: 0, totalBooks: 4, status: 'pending' },
        { id: '10', name: 'Lucy Akinyi', admissionNo: 'ADM010', booksReceived: 0, totalBooks: 4, status: 'pending' },
        { id: '11', name: 'Brian Wekesa', admissionNo: 'ADM011', booksReceived: 0, totalBooks: 4, status: 'pending' },
      ],
    },
    {
      grade: 3,
      section: 'A',
      expanded: false,
      students: [
        { id: '12', name: 'Faith Chebet', admissionNo: 'ADM012', booksReceived: 4, totalBooks: 4, status: 'complete' },
        { id: '13', name: 'Joseph Musyoka', admissionNo: 'ADM013', booksReceived: 4, totalBooks: 4, status: 'complete' },
      ],
    },
  ]);

  const toggleClass = (idx: number) => {
    setClasses(prev => prev.map((c, i) => 
      i === idx ? { ...c, expanded: !c.expanded } : c
    ));
  };

  const getClassStats = (cls: ClassData) => {
    const total = cls.students.length;
    const complete = cls.students.filter(s => s.status === 'complete').length;
    const partial = cls.students.filter(s => s.status === 'partial').length;
    const pending = cls.students.filter(s => s.status === 'pending').length;
    const coverage = Math.round((complete / total) * 100);
    return { total, complete, partial, pending, coverage };
  };

  const overallStats = {
    totalStudents: classes.reduce((sum, c) => sum + c.students.length, 0),
    complete: classes.reduce((sum, c) => sum + c.students.filter(s => s.status === 'complete').length, 0),
    partial: classes.reduce((sum, c) => sum + c.students.filter(s => s.status === 'partial').length, 0),
    pending: classes.reduce((sum, c) => sum + c.students.filter(s => s.status === 'pending').length, 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'partial': return <Clock className="w-4 h-4 text-accent" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Class Distribution
          </h1>
          <p className="text-muted-foreground">
            Track book distribution across classes and students
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import Students
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <Users className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{overallStats.totalStudents}</p>
            <p className="text-xs text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CheckCircle className="w-5 h-5 text-success mb-2" />
            <p className="text-2xl font-bold text-foreground">{overallStats.complete}</p>
            <p className="text-xs text-muted-foreground">Fully Distributed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Clock className="w-5 h-5 text-accent mb-2" />
            <p className="text-2xl font-bold text-foreground">{overallStats.partial}</p>
            <p className="text-xs text-muted-foreground">Partial</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <AlertCircle className="w-5 h-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold text-foreground">{overallStats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or admission number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes */}
      <div className="space-y-4">
        {classes.map((cls, idx) => {
          const stats = getClassStats(cls);
          return (
            <motion.div
              key={`${cls.grade}-${cls.section}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <button
                    onClick={() => toggleClass(idx)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{cls.grade}{cls.section}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">
                          Grade {cls.grade} Section {cls.section}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {stats.total} students
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex items-center gap-3">
                        <Badge variant="available">{stats.complete} complete</Badge>
                        <Badge variant="accent">{stats.partial} partial</Badge>
                        <Badge variant="secondary">{stats.pending} pending</Badge>
                      </div>
                      <div className="w-24">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Coverage</span>
                          <span className="font-medium">{stats.coverage}%</span>
                        </div>
                        <Progress value={stats.coverage} className="h-2" />
                      </div>
                      {cls.expanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                </CardHeader>
                
                {cls.expanded && (
                  <CardContent className="pt-0">
                    <div className="border-t border-border pt-4">
                      <div className="grid gap-2">
                        {cls.students.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.admissionNo}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {student.booksReceived}/{student.totalBooks} books
                                </p>
                                <div className="flex items-center gap-1 justify-end">
                                  {getStatusIcon(student.status)}
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {student.status}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Class
                        </Button>
                        <Button variant="default" size="sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Mark All Distributed
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassDistribution;
