import { create } from 'zustand';
import { authAPI } from '../api';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await authAPI.login(email, password);
          set({ user: response, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      register: async (name: string, email: string, password: string) => {
        try {
          const response = await authAPI.register(name, email, password);
          set({ user: response, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        authAPI.logout();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);