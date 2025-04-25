import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';

export function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const fromPayment = location.state?.fromPayment;

  useEffect(() => {
    if (!fromPayment || !orderDetails) {
      navigate('/');
    }
  }, [fromPayment, orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Order Total:</span>
                <span className="font-medium">₹{orderDetails.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-medium">{orderDetails.orderItems.length} items</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Address:</span>
                <span className="font-medium text-right">
                  {orderDetails.shippingAddress.address},<br />
                  {orderDetails.shippingAddress.city},<br />
                  {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/orders')}
              className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Package className="w-5 h-5 mr-2" />
              Track Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}