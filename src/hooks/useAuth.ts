import { authAPI } from '../api';

export function useAuth() {
  const signIn = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      return { user: response };
    } catch (error: any) {
      return { error };
    }
  };

  return { signIn };
}