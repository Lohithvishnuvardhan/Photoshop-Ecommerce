
import { useCart } from '../context/Cartcontext';
import { Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleCheckout = (items: any) => {
    navigate('/payment', { state: { items } });
  };

  const handleRemove = (item: any) => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart!`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-6 border-b border-gray-200 last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-lg font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="ml-6 flex items-center space-x-4">
                  <button
                    onClick={() => handleCheckout([item])}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => handleCheckout(cartItems)}
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              Checkout All Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;