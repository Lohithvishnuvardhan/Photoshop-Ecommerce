import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://photopixel-bd.onrender.com',
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
  (response) => response.data,
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

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response;
  }
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/api/users/profile', data);
    return response;
  }
};

export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response;
  },

  getProducts: async () => {
    const response = await api.get('/api/admin/products');
    return response;
  },

  deleteOrder: async (orderId: string) => {
    const response = await api.delete(`/api/admin/orders/${orderId}`);
    return response;
  },

  deleteAllOrders: async () => {
    const response = await api.delete('/api/admin/orders');
    return response;
  }
};

export default api;