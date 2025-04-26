import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag, MapPin, Calendar } from 'lucide-react';

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
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Order Found</h2>
          <p className="text-gray-600 mb-6">Please place an order to view order details.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-6 h-6 mr-2 text-purple-600" />
              Order Summary
            </h3>
            <div className="space-y-4">
              {orderDetails.orderItems.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-purple-600 font-medium">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-purple-600" />
              Shipping Details
            </h3>
            <div className="text-gray-600">
              <p>{orderDetails.shippingAddress.address}</p>
              <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
              <p>PIN: {orderDetails.shippingAddress.pincode}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-purple-600" />
              Order Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Total:</span>
                <span className="font-semibold text-gray-900">₹{orderDetails.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold text-gray-900">3-5 Business Days</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate('/orders')}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <Package className="w-5 h-5 mr-2" />
              Track Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
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