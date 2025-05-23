import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    orders: []
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfileData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/users/profile`);
      setProfileData(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Please login to view your profile</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-lg text-gray-900">{profileData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{profileData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}