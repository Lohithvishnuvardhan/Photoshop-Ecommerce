import { useState, useEffect } from 'react';
import { User, AuthError, AuthResponse, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // Make sure this file exists and exports supabase client

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, name: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });
      if (response.error) setError(response.error);
      return response;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (response.error) setError(response.error);
      return response;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw err;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error);
        throw error;
      }
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
}
