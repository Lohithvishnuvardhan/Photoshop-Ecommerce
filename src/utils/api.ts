
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const adminAPI = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const response = await api.get('/admin/products');
      return response.data;
    } catch (error) {
      console.error('Products fetch error:', error);
      throw error;
    }
  },

  deleteOrder: async (orderId: string) => {
    try {
      const response = await api.delete(`/admin/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Delete order error:', error);
      throw error;
    }
  },

  deleteAllOrders: async () => {
    try {
      const response = await api.delete('/admin/orders');
      return response.data;
    } catch (error) {
      console.error('Delete all orders error:', error);
      throw error;
    }
  }
};

export default api;
