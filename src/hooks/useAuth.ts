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
          console.log('Attempting login with:', { email });
          const response = await api.post('/auth/login', { email, password });
          console.log('Login response:', response.data);
          
          const { token, _id, name, isAdmin, success } = response.data;
          
          if (!success || !token) {
            throw new Error('Invalid response from server');
          }
          
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
          console.error('Login error:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          throw new Error(errorMessage);
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
          console.log('Attempting registration with:', { name, email });
          const response = await api.post('/auth/register', { name, email, password });
          console.log('Registration response:', response.data);
          
          const { token, _id, isAdmin, success } = response.data;
          
          if (!success || !token) {
            throw new Error('Invalid response from server');
          }
          
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
          console.error('Registration error:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
          throw new Error(errorMessage);
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