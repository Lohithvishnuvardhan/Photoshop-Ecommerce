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
          const { data } = await api.post('/auth/login', { email, password });
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAdmin', data.isAdmin.toString());
          set({ user: data, isAuthenticated: true, isAdmin: data.isAdmin });
          return data;
        } catch (error: any) {
          throw error;
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
        localStorage.clear();
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