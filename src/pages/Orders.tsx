import { useState, useEffect } from 'react';
import { Package, Calendar, Clock, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { orderAPI } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }
      const response = await orderAPI.getOrders();
      setOrders(response);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleOrderExpansion(order._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Package className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{order._id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium">₹{order.totalPrice.toLocaleString()}</p>
                    </div>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(order.createdAt).split('at')[0]}</span>
                  <Clock className="h-4 w-4 ml-4 mr-2" />
                  <span>{formatDate(order.createdAt).split('at')[1]}</span>
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <h4 className="text-lg font-medium mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-purple-600">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}