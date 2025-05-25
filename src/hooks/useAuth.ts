import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

interface AuthState {
  user: any | null;
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
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, _id, name, isAdmin } = response.data;
          
          // Set token in localStorage and axios headers
          localStorage.setItem('token', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({
            user: { _id, name, email },
            token,
            isAuthenticated: true,
            isAdmin: isAdmin || false
          });
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },

      logout: () => {
        // Clear token from localStorage and axios headers
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false
        });
      },

      register: async (name, email, password) => {
        try {
          const response = await api.post('/auth/register', { name, email, password });
          const { token, _id, isAdmin } = response.data;
          
          // Set token in localStorage and axios headers
          localStorage.setItem('token', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({
            user: { _id, name, email },
            token,
            isAuthenticated: true,
            isAdmin: isAdmin || false
          });
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin
      })
    }
  )
);

export default useAuth;