import axios from 'axios';
import { User } from '../types';

const api = axios.create({
  baseURL: 'https://photopixel-bd.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

interface LoginResponse {
  user: User | null | undefined;
  token: string;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface RegisterResponse {
  user: User | null | undefined;
  token: string;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  orderChange: number;
  userChange: number;
  productChange: number;
  recentOrders: Array<{
    _id: string;
    customer: string;
    email: string;
    products: number;
    total: number;
    status: string;
    date: string;
    orderItems: Array<{
      name: string;
      quantity: number;
      image: string;
      price: number;
    }>;
    paymentStatus: string;
  }>;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  status?: string;
}

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', { name, email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }
};

export const adminAPI = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await api.get<DashboardStats>('/admin/dashboard');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  },

  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  deleteOrder: async (orderId: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(`/admin/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete order');
    }
  },

  deleteAllOrders: async (): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>('/admin/orders');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete all orders');
    }
  }
};

export type { LoginResponse, RegisterResponse, DashboardStats, Product };
export default api;