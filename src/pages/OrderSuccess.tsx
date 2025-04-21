import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';

export function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any payment-related state if needed
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            View Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Home className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
} 