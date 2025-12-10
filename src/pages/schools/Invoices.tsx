import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Search,
  Download,
  Eye,
  Send,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Printer
} from 'lucide-react';

const Invoices = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const invoices = [
    {
      id: 'INV-2024-001',
      date: 'Jan 15, 2024',
      dueDate: 'Feb 15, 2024',
      orderId: 'ORD-2024-045',
      amount: 89600,
      status: 'paid',
      paidDate: 'Jan 20, 2024',
    },
    {
      id: 'INV-2024-002',
      date: 'Jan 14, 2024',
      dueDate: 'Feb 14, 2024',
      orderId: 'ORD-2024-044',
      amount: 39200,
      status: 'paid',
      paidDate: 'Jan 18, 2024',
    },
    {
      id: 'INV-2024-003',
      date: 'Jan 13, 2024',
      dueDate: 'Feb 13, 2024',
      orderId: 'ORD-2024-043',
      amount: 98000,
      status: 'pending',
    },
    {
      id: 'INV-2024-004',
      date: 'Jan 10, 2024',
      dueDate: 'Feb 10, 2024',
      orderId: 'ORD-2024-042',
      amount: 115200,
      status: 'paid',
      paidDate: 'Jan 12, 2024',
    },
    {
      id: 'INV-2024-005',
      date: 'Dec 20, 2023',
      dueDate: 'Jan 20, 2024',
      orderId: 'ORD-2023-098',
      amount: 147000,
      status: 'overdue',
    },
  ];

  const stats = {
    total: invoices.reduce((sum, i) => sum + i.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <Clock className="w-4 h-4 text-accent" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'available';
      case 'pending': return 'accent';
      case 'overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Invoices
          </h1>
          <p className="text-muted-foreground">
            Manage and track your school's invoices
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <FileText className="w-5 h-5 text-primary mb-2" />
            <p className="text-xl font-bold text-foreground">KES {(stats.total / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Total Invoiced</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CheckCircle className="w-5 h-5 text-success mb-2" />
            <p className="text-xl font-bold text-foreground">KES {(stats.paid / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Clock className="w-5 h-5 text-accent mb-2" />
            <p className="text-xl font-bold text-foreground">KES {(stats.pending / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <AlertCircle className="w-5 h-5 text-destructive mb-2" />
            <p className="text-xl font-bold text-foreground">KES {(stats.overdue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">All Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredInvoices.map((invoice, idx) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      invoice.status === 'paid' ? 'bg-success/10' :
                      invoice.status === 'overdue' ? 'bg-destructive/10' : 'bg-accent/10'
                    }`}>
                      {getStatusIcon(invoice.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{invoice.id}</p>
                        <Badge variant={getStatusVariant(invoice.status) as any} className="capitalize">
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Order: {invoice.orderId}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Issued: {invoice.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due: {invoice.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">
                        KES {invoice.amount.toLocaleString()}
                      </p>
                      {invoice.paidDate && (
                        <p className="text-xs text-success">Paid on {invoice.paidDate}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Print">
                        <Printer className="w-4 h-4" />
                      </Button>
                      {invoice.status !== 'paid' && (
                        <Button variant="ghost" size="icon" title="Send Reminder">
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Preview Modal would go here */}
    </div>
  );
};

export default Invoices;
