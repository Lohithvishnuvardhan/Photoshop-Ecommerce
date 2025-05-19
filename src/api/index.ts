import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authAPI = {
  login: async (data: any) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/register', data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Registration failed');
    }
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },
};

export const orderAPI = {
  createOrder: (data: any) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  updateOrder: (id: string, data: any) => api.put(`/orders/${id}`, data),
};

export const productAPI = {
  getProducts: () => api.get('/products'),
  getProduct: (id: string) => api.get(`/products/${id}`),
};

export default api;