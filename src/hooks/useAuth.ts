// src/hooks/useAuth.ts
export function useAuth() {
  const signIn = async (email: string, password: string) => {
    // Simulate a login process (replace with real API later)
    if (email === 'test@example.com' && password === 'password123') {
      return { user: { email } };
    } else {
      return { error: { message: 'Invalid credentials' } };
    }
  };

  return { signIn };
}
