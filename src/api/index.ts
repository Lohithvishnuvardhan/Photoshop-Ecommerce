import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
      const errorMessage = error.response?.data?.message || 'Login failed';
      throw new Error(errorMessage);
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
      const errorMessage = error.response?.data?.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }
};

export default api;