import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: !!localStorage.getItem('token'),
      isAdmin: localStorage.getItem('isAdmin') === 'true',
      login: async (email: string, password: string) => {
        try {
          const response = await api.post<User>('/auth/login', { email, password });
          const { data } = response;
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAdmin', String(data.isAdmin));
          
          set({ 
            user: data,
            isAuthenticated: true,
            isAdmin: data.isAdmin
          });
          
          return data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },
      register: async (name: string, email: string, password: string) => {
        try {
          const response = await api.post('/auth/register', { name, email, password });
          set({ 
            user: response.data,
            isAuthenticated: true,
            isAdmin: response.data.isAdmin
          });
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        set({ 
          user: null, 
          isAuthenticated: false,
          isAdmin: false
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);