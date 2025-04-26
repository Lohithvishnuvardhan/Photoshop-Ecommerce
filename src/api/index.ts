import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:5000/api';

interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      const { token, isAdmin, _id } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('isAdmin', isAdmin.toString());
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/register', { name, email, password });
      const { token, isAdmin, _id } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('isAdmin', isAdmin.toString());
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }
};

export const orderAPI = {
  createOrder: async (orderData: any, _token: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await api.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error: any) {
      console.error('Create order error:', error.response || error);
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  },

  getOrders: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await api.get('/orders/myorders');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
};

export default api;