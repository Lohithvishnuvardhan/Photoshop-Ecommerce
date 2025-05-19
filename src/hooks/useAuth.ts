import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../utils/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
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
      loading: false,
      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const data = await authAPI.login(email, password);
          
          if (!data.token) {
            throw new Error('No token received');
          }
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAdmin', String(data.isAdmin));
          localStorage.setItem('userId', data._id);
          
          set({ 
            user: data,
            isAuthenticated: true,
            isAdmin: data.isAdmin,
            loading: false
          });
          
          return data;
        } catch (error: any) {
          set({ loading: false });
          throw new Error(error.message || 'Login failed');
        }
      },
      register: async (name: string, email: string, password: string) => {
        set({ loading: true });
        try {
          const data = await authAPI.register(name, email, password);
          
          if (!data.token) {
            throw new Error('No token received');
          }
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data._id);
          localStorage.setItem('isAdmin', String(data.isAdmin));
          
          set({ 
            user: data,
            isAuthenticated: true,
            isAdmin: data.isAdmin,
            loading: false
          });
        } catch (error: any) {
          set({ loading: false });
          throw new Error(error.message || 'Registration failed');
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        set({ 
          user: null, 
          isAuthenticated: false,
          isAdmin: false,
          loading: false
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