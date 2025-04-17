import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, User, MapPin, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
  quantity: number;
}

interface PaymentProps {
  items?: CartItem[];
  product?: CartItem;
}

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, product } = location.state as PaymentProps || {};
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items 
      ? items.reduce((acc, item) => ({ ...acc, [item.product._id]: item.quantity }), {})
      : product 
        ? { [product.product._id]: 1 }
        : {}
  );

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment processed successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = (prev[itemId] || 1) + change;
      if (newQuantity >= 1) {
        return { ...prev, [itemId]: newQuantity };
      }
      return prev;
    });
  };

  if (!items && !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No items selected</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const displayItems = items ?? (product ? [product] : []);
  const total = displayItems.reduce((sum, item) => 
    sum + item.product.price * (quantities[item.product._id] || 1), 
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {displayItems.map((item) => (
                <div key={item.product._id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.product.price.toLocaleString()}</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        onClick={() => handleQuantityChange(item.product._id, -1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold">{quantities[item.product._id] || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, 1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-purple-600 font-semibold">
                      Subtotal: ₹{((quantities[item.product._id] || 1) * item.product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-2xl font-bold text-purple-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="123456"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Pay ₹{total.toLocaleString()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}