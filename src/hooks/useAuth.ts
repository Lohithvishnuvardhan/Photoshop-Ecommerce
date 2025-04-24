import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../api';

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
          const response = await authAPI.login(email, password);
          set({ 
            user: response, 
            isAuthenticated: true,
            isAdmin: response.isAdmin
          });
          return response;
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