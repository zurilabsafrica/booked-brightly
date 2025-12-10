import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Package, 
  FileText, 
  TrendingUp,
  Calendar,
  ArrowRight,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SchoolDashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Students', value: '847', change: '+23 this term', color: 'text-primary' },
    { icon: BookOpen, label: 'Books Distributed', value: '3,204', change: '95% coverage', color: 'text-success' },
    { icon: Package, label: 'Pending Orders', value: '3', change: '2 awaiting payment', color: 'text-accent' },
    { icon: FileText, label: 'Open Invoices', value: 'KES 245,000', change: '2 invoices', color: 'text-info' },
  ];

  const recentOrders = [
    { id: 'ORD-2024-045', class: 'Grade 4A', books: 32, status: 'delivered', date: 'Jan 15, 2024' },
    { id: 'ORD-2024-044', class: 'Grade 5B', books: 28, status: 'in-transit', date: 'Jan 14, 2024' },
    { id: 'ORD-2024-043', class: 'Grade 3A', books: 35, status: 'pending', date: 'Jan 13, 2024' },
  ];

  const classOverview = [
    { class: 'Grade 1', students: 120, distributed: 118, coverage: 98 },
    { class: 'Grade 2', students: 115, distributed: 112, coverage: 97 },
    { class: 'Grade 3', students: 108, distributed: 105, coverage: 97 },
    { class: 'Grade 4', students: 125, distributed: 98, coverage: 78 },
    { class: 'Grade 5', students: 118, distributed: 0, coverage: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, Nairobi Primary School
          </h1>
          <p className="text-muted-foreground">
            Manage your textbook orders and distributions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            Alerts
            <Badge variant="destructive" className="ml-1">2</Badge>
          </Button>
          <Link to="/schools/orders/new">
            <Button variant="hero" className="gap-2">
              <Package className="w-4 h-4" />
              New Bulk Order
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-success mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Link to="/schools/orders">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.class} • {order.books} books</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          order.status === 'delivered' ? 'available' : 
                          order.status === 'in-transit' ? 'accent' : 'secondary'
                        }
                      >
                        {order.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Class Coverage */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Class Coverage</CardTitle>
            <Link to="/schools/distribution">
              <Button variant="ghost" size="sm">
                Details <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classOverview.map((cls) => (
                <div key={cls.class} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{cls.class}</span>
                    <span className="text-muted-foreground">{cls.coverage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        cls.coverage >= 90 ? 'bg-success' : 
                        cls.coverage >= 50 ? 'bg-accent' : 'bg-destructive'
                      }`}
                      style={{ width: `${cls.coverage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {cls.distributed}/{cls.students} students
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Package, label: 'New Bulk Order', href: '/schools/orders/new', color: 'bg-primary' },
              { icon: Users, label: 'Upload Class List', href: '/schools/distribution', color: 'bg-accent' },
              { icon: FileText, label: 'View Invoices', href: '/schools/invoices', color: 'bg-info' },
              { icon: TrendingUp, label: 'Reports', href: '/schools/reports', color: 'bg-success' },
            ].map((action) => (
              <Link key={action.label} to={action.href}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="font-medium text-foreground text-sm">{action.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolDashboard;
