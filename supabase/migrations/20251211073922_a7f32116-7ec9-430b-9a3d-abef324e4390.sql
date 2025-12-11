-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'school_partner', 'parent');

-- Create user_roles table (separate from profiles per security guidelines)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  county TEXT,
  phone TEXT,
  email TEXT,
  contact_person TEXT,
  total_students INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create school_members table (links users to schools)
CREATE TABLE public.school_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (school_id, user_id)
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  stream TEXT,
  student_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create books table (catalog)
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  isbn TEXT UNIQUE,
  publisher TEXT,
  edition TEXT,
  kicd_approved BOOLEAN DEFAULT false,
  retail_price INTEGER NOT NULL,
  rental_price INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  condition TEXT DEFAULT 'new' CHECK (condition IN ('new', 'good', 'fair')),
  cover_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bulk_orders table
CREATE TABLE public.bulk_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_books INTEGER DEFAULT 0,
  total_amount INTEGER DEFAULT 0,
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bulk_order_items table
CREATE TABLE public.bulk_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.bulk_orders(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES public.books(id) NOT NULL,
  class_id UUID REFERENCES public.classes(id),
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create class_distributions table
CREATE TABLE public.class_distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.bulk_orders(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'partial', 'complete')),
  distributed_count INTEGER DEFAULT 0,
  total_count INTEGER DEFAULT 0,
  distributed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create distribution_items table
CREATE TABLE public.distribution_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  distribution_id UUID REFERENCES public.class_distributions(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES public.books(id) NOT NULL,
  student_name TEXT,
  admission_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'distributed', 'returned')),
  distributed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.bulk_orders(id),
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  payment_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is member of a school
CREATE OR REPLACE FUNCTION public.is_school_member(_user_id UUID, _school_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.school_members
    WHERE user_id = _user_id AND school_id = _school_id
  )
$$;

-- Function to get user's school ID
CREATE OR REPLACE FUNCTION public.get_user_school_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT school_id FROM public.school_members
  WHERE user_id = _user_id LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for schools
CREATE POLICY "School members can view their school" ON public.schools
  FOR SELECT USING (public.is_school_member(auth.uid(), id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage schools" ON public.schools
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for school_members
CREATE POLICY "Members can view school membership" ON public.school_members
  FOR SELECT USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage school members" ON public.school_members
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for classes
CREATE POLICY "School members can view classes" ON public.classes
  FOR SELECT USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "School members can manage classes" ON public.classes
  FOR ALL USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for books (public read)
CREATE POLICY "Anyone can view books" ON public.books
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage books" ON public.books
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bulk_orders
CREATE POLICY "School members can view their orders" ON public.bulk_orders
  FOR SELECT USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "School members can create orders" ON public.bulk_orders
  FOR INSERT WITH CHECK (public.is_school_member(auth.uid(), school_id));

CREATE POLICY "School members can update their orders" ON public.bulk_orders
  FOR UPDATE USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bulk_order_items
CREATE POLICY "Users can view order items for their orders" ON public.bulk_order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bulk_orders 
      WHERE id = order_id AND (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Users can manage order items for their orders" ON public.bulk_order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.bulk_orders 
      WHERE id = order_id AND (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- RLS Policies for class_distributions
CREATE POLICY "School members can view distributions" ON public.class_distributions
  FOR SELECT USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "School members can manage distributions" ON public.class_distributions
  FOR ALL USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for distribution_items
CREATE POLICY "Users can view distribution items" ON public.distribution_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.class_distributions 
      WHERE id = distribution_id AND (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Users can manage distribution items" ON public.distribution_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.class_distributions 
      WHERE id = distribution_id AND (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- RLS Policies for invoices
CREATE POLICY "School members can view their invoices" ON public.invoices
  FOR SELECT USING (public.is_school_member(auth.uid(), school_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage invoices" ON public.invoices
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 5, '0');
  RETURN new_number;
END;
$$;

CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'INV-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('invoice_number_seq')::TEXT, 5, '0');
  RETURN new_number;
END;
$$;

CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bulk_orders_updated_at BEFORE UPDATE ON public.bulk_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_class_distributions_updated_at BEFORE UPDATE ON public.class_distributions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();