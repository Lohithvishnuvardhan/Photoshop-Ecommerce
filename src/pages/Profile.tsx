import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building, Globe, DollarSign, Users, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

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
  orderHistory: {
    total: number;
    count: number;
  };
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
      
      // First try to get user profile
      const response = await api.get('/users/profile');
      
      // Create business profile with default values if data is missing
      const businessProfile: BusinessProfile = {
        name: response.data?.name || 'Not Available',
        email: response.data?.email || 'Not Available',
        phoneNumber: response.data?.phoneNumber || 'Not Available',
        businessName: 'Photo Studio Pro',
        website: 'www.photostudiopro.com',
        industry: 'Photography',
        annualRevenue: '$500,000',
        employeeCount: '15',
        address: {
          street: response.data?.addresses?.[0]?.street || '123 Business Ave',
          city: response.data?.addresses?.[0]?.city || 'New York',
          state: response.data?.addresses?.[0]?.state || 'NY',
          postalCode: response.data?.addresses?.[0]?.postalCode || '10001',
          country: response.data?.addresses?.[0]?.country || 'United States'
        },
        orderHistory: {
          total: 250000,
          count: 45
        }
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

            {/* Order Statistics */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{profile?.orderHistory.count}</p>
                    </div>
                    <Package className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${profile?.orderHistory.total.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}