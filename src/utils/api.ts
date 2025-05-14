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
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;