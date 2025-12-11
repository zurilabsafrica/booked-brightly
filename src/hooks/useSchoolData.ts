import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface School {
  id: string;
  name: string;
  address: string | null;
  county: string | null;
  phone: string | null;
  email: string | null;
  contact_person: string | null;
  total_students: number;
  status: string;
}

export interface ClassData {
  id: string;
  name: string;
  grade: number;
  stream: string | null;
  student_count: number;
  school_id: string;
}

export interface BulkOrder {
  id: string;
  order_number: string;
  school_id: string;
  status: string;
  total_books: number;
  total_amount: number;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
}

export interface ClassDistribution {
  id: string;
  class_id: string;
  school_id: string;
  order_id: string | null;
  status: string;
  distributed_count: number;
  total_count: number;
  distributed_at: string | null;
  class?: ClassData;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  school_id: string;
  order_id: string | null;
  amount: number;
  status: string;
  due_date: string;
  paid_at: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  created_at: string;
}

export function useSchoolData() {
  const { user } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [orders, setOrders] = useState<BulkOrder[]>([]);
  const [distributions, setDistributions] = useState<ClassDistribution[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSchoolData();
    }
  }, [user]);

  const fetchSchoolData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      // Get user's school membership
      const { data: membership, error: memberError } = await supabase
        .from('school_members')
        .select('school_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (memberError) throw memberError;

      if (!membership) {
        setLoading(false);
        return;
      }

      // Fetch school details
      const { data: schoolData, error: schoolError } = await supabase
        .from('schools')
        .select('*')
        .eq('id', membership.school_id)
        .single();

      if (schoolError) throw schoolError;
      setSchool(schoolData);

      // Fetch classes
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('*')
        .eq('school_id', membership.school_id)
        .order('grade', { ascending: true });

      if (classesError) throw classesError;
      setClasses(classesData || []);

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('bulk_orders')
        .select('*')
        .eq('school_id', membership.school_id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Fetch distributions
      const { data: distributionsData, error: distributionsError } = await supabase
        .from('class_distributions')
        .select('*, class:classes(*)')
        .eq('school_id', membership.school_id)
        .order('created_at', { ascending: false });

      if (distributionsError) throw distributionsError;
      setDistributions(distributionsData || []);

      // Fetch invoices
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .eq('school_id', membership.school_id)
        .order('created_at', { ascending: false });

      if (invoicesError) throw invoicesError;
      setInvoices(invoicesData || []);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => fetchSchoolData();

  return {
    school,
    classes,
    orders,
    distributions,
    invoices,
    loading,
    error,
    refetch,
  };
}
