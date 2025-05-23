import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../utils/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (email, password) => {
        const response = await authAPI.login(email, password);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isAdmin: response.user?.isAdmin ?? false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      register: async (name, email, password) => {
        const response = await authAPI.register(name, email, password);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isAdmin: response.user?.isAdmin ?? false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuth;
