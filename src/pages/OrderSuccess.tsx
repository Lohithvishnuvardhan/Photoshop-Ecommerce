import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Home } from 'lucide-react';

export function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after a brief delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">This page is no longer in use</h2>
        <p className="text-gray-600 mb-6">Please check your orders page to view your order details.</p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}