import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag, MapPin, Calendar, CreditCard } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-lg opacity-90">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          <div className="p-6 space-y-8">
            {/* Order Items */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold">Order Summary</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {orderDetails.orderItems.map((item: any, index: number) => (
                  <div key={index} className="py-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="mr-4">Quantity: {item.quantity}</span>
                        <span>Price: ₹{item.price.toLocaleString()}</span>
                      </div>
                      <p className="mt-2 text-purple-600 font-medium">
                        Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold">Shipping Details</h3>
                </div>
                <div className="text-gray-600 space-y-2">
                  <p className="font-medium text-gray-900">Delivery Address:</p>
                  <p>{orderDetails.shippingAddress.address}</p>
                  <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                  <p>PIN: {orderDetails.shippingAddress.pincode}</p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold">Payment Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₹{orderDetails.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold text-purple-600">
                      ₹{orderDetails.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold">Delivery Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-gray-600">3-5 Business Days</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-gray-900">Order Status</p>
                  <p className="text-green-600">Processing</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/orders')}
                className="flex-1 bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Package className="w-5 h-5 mr-2" />
                Track Order
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-600 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}