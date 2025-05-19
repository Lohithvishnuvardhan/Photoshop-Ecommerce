import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor to add token
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

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
 login: async (data: any): Promise<any> => {
  const response = await api.post('/auth/login', data) as { token: string };
  const token = response.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  return response;
},
  register: (data: any) => api.post('/auth/register', data),
  logout: () => {
    localStorage.removeItem('token');
    return api.post('/auth/logout');
  },
  getProfile: () => api.get('/auth/profile'),
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
