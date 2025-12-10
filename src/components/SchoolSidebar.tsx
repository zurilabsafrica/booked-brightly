import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings,
  Book,
  LogOut,
  ChevronLeft,
  School
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SchoolSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SchoolSidebar = ({ collapsed, onToggle }: SchoolSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/schools' },
    { icon: Package, label: 'Bulk Orders', href: '/schools/orders' },
    { icon: Users, label: 'Distribution', href: '/schools/distribution' },
    { icon: FileText, label: 'Invoices', href: '/schools/invoices' },
    { icon: Settings, label: 'Settings', href: '/schools/settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/schools') return location.pathname === '/schools';
    return location.pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/schools" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <School className="w-5 h-5" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="font-display font-bold text-lg">School Portal</span>
              <p className="text-xs text-sidebar-foreground/70">Nairobi Primary</p>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <motion.div
              whileHover={{ x: 4 }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link to="/">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
            <Book className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium text-sm">Browse Catalog</span>}
          </div>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium text-sm">Sign Out</span>}
        </button>
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border shadow-md hover:bg-sidebar-accent"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
      </Button>
    </aside>
  );
};

export default SchoolSidebar;
