import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building, Globe, DollarSign, Users, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

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

interface BusinessProfile {
  name: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  website: string;
  industry: string;
  annualRevenue: string;
  employeeCount: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  latestOrder?: Order;
}

export default function Profile() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/profile' } });
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get user profile
      const profileResponse = await api.get('/users/profile');
      
      // Get latest order
      const ordersResponse = await api.get('/orders/myorders');
      const orders = ordersResponse.data;
      const latestOrder = orders.length > 0 ? orders[0] : null;

      // Create business profile with default values if data is missing
      const businessProfile: BusinessProfile = {
        name: profileResponse.data?.name || 'Not Available',
        email: profileResponse.data?.email || 'Not Available',
        phoneNumber: profileResponse.data?.phoneNumber || 'Not Available',
        businessName: 'Photo Pixel Studio',
        website: 'www.photopixel.com',
        industry: 'Photography',
        annualRevenue: '$500,000',
        employeeCount: '15',
        address: {
          street: profileResponse.data?.addresses?.[0]?.street || '123 Business Ave',
          city: profileResponse.data?.addresses?.[0]?.city || 'New York',
          state: profileResponse.data?.addresses?.[0]?.state || 'NY',
          postalCode: profileResponse.data?.addresses?.[0]?.postalCode || '10001',
          country: profileResponse.data?.addresses?.[0]?.country || 'United States'
        },
        latestOrder: latestOrder
      };
      
      setProfile(businessProfile);
      setError(null);
    } catch (error: any) {
      console.error('Profile loading error:', error);
      setError('Failed to load profile. Please try again.');
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={() => {
              setError(null);
              fetchProfile();
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6">
            <div className="flex items-center">
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                <Building className="h-10 w-10 text-purple-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">{profile?.businessName}</h1>
                <p className="text-purple-100">{profile?.industry}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h2>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="text-lg font-medium text-gray-900">{profile?.website}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Employees</p>
                    <p className="text-lg font-medium text-gray-900">{profile?.employeeCount}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Annual Revenue</p>
                    <p className="text-lg font-medium text-gray-900">{profile?.annualRevenue}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="flex items-center">
                  <User className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p className="text-lg font-medium text-gray-900">{profile?.name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium text-gray-900">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-medium text-gray-900">{profile?.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Address</h2>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {profile?.address.street}<br />
                    {profile?.address.city}, {profile?.address.state} {profile?.address.postalCode}<br />
                    {profile?.address.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Latest Order Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Order</h2>
              {profile?.latestOrder ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <ShoppingBag className="h-6 w-6 text-purple-500 mr-2" />
                      <span className="text-lg font-medium">Order #{profile.latestOrder._id}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {profile.latestOrder.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {profile.latestOrder.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-purple-600 font-medium">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total Amount:</span>
                      <span className="text-xl font-bold text-purple-600">
                        ₹{profile.latestOrder.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Ordered on: {new Date(profile.latestOrder.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No orders placed yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}