import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check for token on mount
    const token = localStorage.getItem('token');
    if (!token && !isAuthenticated) {
      // Redirect to login if no token found
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;