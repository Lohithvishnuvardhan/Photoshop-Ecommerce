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

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      
      // Only redirect to login if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      const { token, isAdmin, _id } = response.data;
      
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('isAdmin', isAdmin.toString());
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/register', { name, email, password });
      const { token, isAdmin, _id } = response.data;
      
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('isAdmin', isAdmin.toString());
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }
};

export const orderAPI = {
  createOrder: async (orderData: any) => {
    try {
      const response = await api.post('/orders', orderData);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create order');
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders/myorders');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch orders');
    }
  }
};

export default api;