import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Package, MapPin, Mail, Phone, User, Clock, ChevronRight } from 'lucide-react';

interface Order {
  _id: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    image: string;
    price: number;
  }>;
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface ProfileData {
  name: string;
  email: string;
  phoneNumber?: string;
  addresses?: Array<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>;
  orders: Order[];
}

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    orders: []
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchProfileData();
    fetchRecentOrders();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Mock profile data since we removed authentication
      const mockProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 234 567 8900',
        addresses: [
          {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'USA'
          }
        ],
        orders: []
      };
      setProfileData(mockProfile);
    } catch (error: any) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      // Mock recent orders data
      const mockOrders = [
        {
          _id: 'order_1',
          orderItems: [
            {
              name: 'Canon EOS R5',
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
              price: 324900
            }
          ],
          totalPrice: 324900,
          status: 'Processing',
          createdAt: new Date().toISOString()
        }
      ];
      setRecentOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setRecentOrders([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-8">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                    <User className="h-12 w-12 text-purple-600" />
                  </div>
                  <div className="ml-6">
                    <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
                    <p className="text-purple-100">Premium Member</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-6 space-y-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{profileData.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{profileData.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>

                {profileData.addresses && profileData.addresses[0] && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Primary Address</p>
                      <p className="text-gray-900">
                        {profileData.addresses[0].street}<br />
                        {profileData.addresses[0].city}, {profileData.addresses[0].state}<br />
                        {profileData.addresses[0].postalCode}, {profileData.addresses[0].country}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
              </div>

              <div className="divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-medium text-gray-900">{order._id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-shrink-0">
                          <Package className="h-10 w-10 text-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: ₹{order.totalPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <time className="text-sm text-gray-500">{formatDate(order.createdAt)}</time>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {order.orderItems.slice(0, 3).map((item, index) => (
                            <img
                              key={index}
                              src={item.image}
                              alt={item.name}
                              className="h-8 w-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                          {order.orderItems.length > 3 && (
                            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-600">+{order.orderItems.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => navigate(`/view-order/${order._id}`)}
                          className="flex items-center text-purple-600 hover:text-purple-700"
                        >
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
                    <button
                      onClick={() => navigate('/')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                    >
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}