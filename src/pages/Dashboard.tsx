import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Package, 
  Truck, 
  Clock, 
  CreditCard,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const activeRentals = [
    {
      id: 'rental-001',
      studentName: 'John Kamau',
      grade: 3,
      books: 4,
      status: 'active',
      dueDate: 'Nov 30, 2025',
      totalPaid: 1450,
    },
    {
      id: 'rental-002',
      studentName: 'Mary Kamau',
      grade: 5,
      books: 5,
      status: 'active',
      dueDate: 'Nov 30, 2025',
      totalPaid: 1820,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: 'Jan 15, 2024',
      books: 4,
      total: 1450,
      status: 'delivered',
    },
    {
      id: 'ORD-2024-002',
      date: 'Jan 15, 2024',
      books: 5,
      total: 1820,
      status: 'delivered',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back, Jane
            </h1>
            <p className="text-muted-foreground">
              Manage your textbook rentals and track deliveries
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: BookOpen, label: 'Active Rentals', value: '9 books', color: 'text-primary' },
              { icon: Package, label: 'Orders', value: '2 orders', color: 'text-accent' },
              { icon: CreditCard, label: 'Total Saved', value: 'KES 5,200', color: 'text-success' },
              { icon: Clock, label: 'Days Until Return', value: '327 days', color: 'text-info' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Rentals */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Active Rentals
                </h2>
                <Link to="/catalog">
                  <Button variant="outline" size="sm">
                    Add More Books
                  </Button>
                </Link>
              </div>

              {activeRentals.map((rental, idx) => (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card variant="elevated">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {rental.studentName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Grade {rental.grade} • {rental.books} books rented
                          </p>
                        </div>
                        <Badge variant="available">Active</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-muted">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" />
                            Return Due
                          </div>
                          <p className="font-semibold text-foreground">{rental.dueDate}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <CreditCard className="w-4 h-4" />
                            Amount Paid
                          </div>
                          <p className="font-semibold text-foreground">KES {rental.totalPaid.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Books
                        </Button>
                        <Button variant="default" size="sm" className="flex-1">
                          Renew Early
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Recent Orders */}
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Recent Orders
                </h2>
                
                <Card>
                  <CardContent className="p-0">
                    {recentOrders.map((order, idx) => (
                      <div
                        key={order.id}
                        className={`p-4 flex items-center justify-between ${
                          idx !== recentOrders.length - 1 ? 'border-b border-border' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <Truck className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.books} books
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">KES {order.total.toLocaleString()}</p>
                            <Badge variant="available" className="text-xs">Delivered</Badge>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Renewal Reminder */}
              <Card variant="featured">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Renewal Coming Up</p>
                      <p className="text-xs text-muted-foreground">October 2025</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set up automatic renewal to ensure books arrive on time for the new term.
                  </p>
                  <Button variant="accent" size="sm" className="w-full">
                    Enable Auto-Renewal
                  </Button>
                </CardContent>
              </Card>

              {/* Report Issue */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    <p className="font-semibold text-foreground">Report an Issue</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book damaged or missing? Let us know and we'll help you resolve it.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Report Damage/Loss
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Account</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  {[
                    { icon: User, label: 'Profile Settings', href: '/profile' },
                    { icon: CreditCard, label: 'Payment Methods', href: '/payments' },
                    { icon: Bell, label: 'Notifications', href: '/notifications' },
                    { icon: LogOut, label: 'Sign Out', href: '/logout' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
