import { useCart } from '../context/Cartcontext';
import { Minus, Plus, X, ShoppingBag, Heart, Clock, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, isLoading } = useCart();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState<any[]>([]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = async (itemId: string, newQuantity: number, stock: number) => {
    if (newQuantity >= 1) {
      if (newQuantity <= stock) {
        await updateQuantity(itemId, newQuantity);
      } else {
        toast.error(`Sorry, only ${stock} items available in stock`);
      }
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/payment', { state: { items: cart } });
  };

  const handleRemove = async (itemId: string) => {
    await removeFromCart(itemId);
    toast.success('Item removed from cart');
  };

  const handleSaveForLater = (item: any) => {
    setSavedItems([...savedItems, item]);
    removeFromCart(item._id);
    toast.success('Item saved for later');
  };

  const handleMoveToCart = (item: any) => {
    setSavedItems(savedItems.filter(savedItem => savedItem._id !== item._id));
    updateQuantity(item._id, 1);
    toast.success('Item moved to cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (cart.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some amazing photography gear to your cart!</p>
        <button
          onClick={() => navigate('/cameras')}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Browse Cameras
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 space-y-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center py-6 border-b border-gray-200 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 ml-6">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                      
                      <div className="mt-4 flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.stock)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.stock)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveForLater(item)}
                            className="text-purple-600 hover:text-purple-700 flex items-center"
                          >
                            <Heart className="h-5 w-5 mr-1" />
                            Save
                          </button>
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      
                      {item.stock < 5 && (
                        <p className="text-red-500 text-sm mt-2">
                          Only {item.stock} items left in stock!
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved For Later */}
            {savedItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved For Later</h2>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 space-y-6">
                    {savedItems.map((item) => (
                      <div key={item._id} className="flex items-center py-6 border-b border-gray-200 last:border-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 ml-6">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-semibold text-gray-900">
                              ₹{item.price.toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleMoveToCart(item)}
                              className="text-purple-600 hover:text-purple-700"
                            >
                              Move to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{total > 50000 ? 'Free' : '₹999'}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{(total > 50000 ? total : total + 999).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Estimated delivery: 2-4 business days</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>Free shipping on orders above ₹50,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;