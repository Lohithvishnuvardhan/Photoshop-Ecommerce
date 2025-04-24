import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../api';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
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
          const response = await authAPI.login(email, password);
          set({ 
            user: response, 
            isAuthenticated: true,
            isAdmin: response.isAdmin
          });
        } catch (error) {
          throw error;
        }
      },
      register: async (name: string, email: string, password: string) => {
        try {
          const response = await authAPI.register(name, email, password);
          set({ 
            user: response, 
            isAuthenticated: true,
            isAdmin: response.isAdmin
          });
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        authAPI.logout();
        set({ 
          user: null, 
          isAuthenticated: false,
          isAdmin: false
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);