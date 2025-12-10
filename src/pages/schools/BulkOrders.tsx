import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Download,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BulkOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const orders = [
    { 
      id: 'ORD-2024-045', 
      date: 'Jan 15, 2024',
      classes: ['Grade 4A', 'Grade 4B'],
      books: 64,
      students: 32,
      total: 'KES 89,600',
      status: 'delivered',
      paymentStatus: 'paid'
    },
    { 
      id: 'ORD-2024-044', 
      date: 'Jan 14, 2024',
      classes: ['Grade 5B'],
      books: 28,
      students: 28,
      total: 'KES 39,200',
      status: 'in-transit',
      paymentStatus: 'paid'
    },
    { 
      id: 'ORD-2024-043', 
      date: 'Jan 13, 2024',
      classes: ['Grade 3A', 'Grade 3B'],
      books: 70,
      students: 35,
      total: 'KES 98,000',
      status: 'processing',
      paymentStatus: 'pending'
    },
    { 
      id: 'ORD-2024-042', 
      date: 'Jan 10, 2024',
      classes: ['Grade 1A', 'Grade 1B', 'Grade 1C'],
      books: 96,
      students: 48,
      total: 'KES 115,200',
      status: 'delivered',
      paymentStatus: 'paid'
    },
    { 
      id: 'ORD-2024-041', 
      date: 'Jan 8, 2024',
      classes: ['Grade 2A'],
      books: 24,
      students: 24,
      total: 'KES 33,600',
      status: 'cancelled',
      paymentStatus: 'refunded'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'available';
      case 'in-transit': return 'accent';
      case 'processing': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.classes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['delivered', 'in-transit', 'processing', 'cancelled'];

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
            Bulk Orders
          </h1>
          <p className="text-muted-foreground">
            Manage and track your school's textbook orders
          </p>
        </div>
        <Link to="/schools/orders/new">
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            New Bulk Order
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: '45', icon: Package },
          { label: 'Books Ordered', value: '3,240', icon: Package },
          { label: 'Pending', value: '3', icon: Clock },
          { label: 'This Month', value: 'KES 375,600', icon: Truck },
        ].map((stat, idx) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <stat.icon className="w-5 h-5 text-muted-foreground mb-2" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                All
              </Button>
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      order.status === 'delivered' ? 'bg-success/10' :
                      order.status === 'in-transit' ? 'bg-accent/10' :
                      order.status === 'cancelled' ? 'bg-destructive/10' : 'bg-muted'
                    }`}>
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <Badge variant={getStatusVariant(order.status) as any} className="capitalize">
                          {order.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.classes.join(', ')} • {order.students} students
                      </p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.total}</p>
                      <p className="text-xs text-muted-foreground">{order.books} books</p>
                      <Badge 
                        variant={order.paymentStatus === 'paid' ? 'available' : 
                          order.paymentStatus === 'refunded' ? 'secondary' : 'accent'} 
                        className="mt-1 text-xs"
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkOrders;
