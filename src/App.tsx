import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Onboarding from "./pages/Onboarding";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

// School Portal Pages
import SchoolLayout from "./pages/schools/SchoolLayout";
import SchoolDashboard from "./pages/schools/SchoolDashboard";
import BulkOrders from "./pages/schools/BulkOrders";
import NewBulkOrder from "./pages/schools/NewBulkOrder";
import ClassDistribution from "./pages/schools/ClassDistribution";
import Invoices from "./pages/schools/Invoices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            
            {/* School Portal Routes */}
            <Route path="/schools" element={<SchoolLayout />}>
              <Route index element={<SchoolDashboard />} />
              <Route path="orders" element={<BulkOrders />} />
              <Route path="orders/new" element={<NewBulkOrder />} />
              <Route path="distribution" element={<ClassDistribution />} />
              <Route path="invoices" element={<Invoices />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
