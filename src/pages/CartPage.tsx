import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Heart, Clock, Truck, Shield, ArrowRight, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { CartItem } from '../types';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, isLoading, addToCart } = useCart();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 50000 ? 0 : 999;
  const finalTotal = total + shipping;

  const handleQuantityChange = async (productId: string, newQuantity: number, stock: number) => {
    if (newQuantity >= 1) {
      if (newQuantity <= stock) {
        await updateQuantity(productId, newQuantity);
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

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <ShoppingBag className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some amazing photography gear to your cart!</p>
          <button
            onClick={() => navigate('/cameras')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            Browse Cameras
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShoppingBag className="h-8 w-8 text-purple-600 mr-3" />
            Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h1>
          <button
            onClick={() => navigate('/cameras')}
            className="text-purple-600 hover:text-purple-700 flex items-center"
          >
            Continue Shopping
            <ArrowRight className="ml-1 h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.product._id} className="flex items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1 ml-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-gray-600 mt-1">{item.product.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Package className="h-4 w-4 mr-1" />
                            <span>{item.product.stock} units in stock</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(item.product._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center border rounded-lg bg-white shadow-sm">
                            <button
                              onClick={() => handleQuantityChange(item.product._id, item.quantity - 1, item.product.stock)}
                              className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-6 py-2 font-medium text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product._id, item.quantity + 1, item.product.stock)}
                              className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSavedItems([...savedItems, item]);
                            handleRemove(item.product._id);
                          }}
                          className="text-purple-600 hover:text-purple-700 flex items-center"
                        >
                          <Heart className="h-5 w-5 mr-1" />
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved for Later ({savedItems.length} items)</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 space-y-6">
                    {savedItems.map((item) => (
                      <div key={item.product._id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 ml-6">
                          <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-gray-600 mt-1">{item.product.description}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xl font-semibold text-gray-900">₹{item.product.price.toLocaleString()}</span>
                            <button
                              onClick={() => {
                                setSavedItems(savedItems.filter(i => i.product._id !== item.product._id));
                                addToCart({
                                  product: item.product, quantity: item.quantity,
                                  _id: '',
                                  name: '',
                                  price: 0,
                                  image: '',
                                  description: '',
                                  stock: 0
                                });
                                toast.success(`${item.product.name} moved to cart`);
                              }}
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
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    (Including all taxes)
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500 mr-2" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Delivery in 2-4 business days</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-purple-500 mr-2" />
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