import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An error occurred');
};

// Products
export const productsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) handleSupabaseError(error);
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) handleSupabaseError(error);
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) handleSupabaseError(error);
    return data;
  }
};

// Orders
export const ordersApi = {
  async create(order: { 
    user_id: string; 
    total_amount: number; 
    items: Array<{ 
      product_id: string; 
      quantity: number; 
      unit_price: number; 
    }> 
  }) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order]);

    if (error) handleSupabaseError(error);
    return data;
  }
};
