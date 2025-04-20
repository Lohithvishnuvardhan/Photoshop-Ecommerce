import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Camera, ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export function Layout() {
  const cartItems = useCartStore(state => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <Camera className="h-10 w-10 text-purple-500" />
              <span className="font-bold text-3xl text-white tracking-tight">Photo Pixel</span>
            </Link>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for cameras, lenses, accessories..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative group">
                {isAuthenticated ? (
                  <div className="flex flex-col">
                    <Link to="/profile" className="text-gray-300 hover:text-white flex items-center space-x-1 mb-2">
                      <User className="h-6 w-6" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white flex items-center space-x-1 w-full"
                    >
                      <LogOut className="h-6 w-6" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-gray-300 hover:text-white flex items-center space-x-1">
                    <User className="h-6 w-6" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
              <Link to="/cart" className="text-gray-300 hover:text-white relative">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="py-4">
            <div className="flex space-x-8">
              <Link to="/cameras" className="text-gray-300 hover:text-white">
                Cameras
              </Link>
              <Link to="/lenses" className="text-gray-300 hover:text-white">
                Lenses
              </Link>
              <Link to="/accessories" className="text-gray-300 hover:text-white">
                Accessories
              </Link>
              <Link to="/batteries" className="text-gray-300 hover:text-white">
                Batteries
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="bg-gray-100">
        <Outlet />
      </main>

      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-white">About Us</h3>
              <p className="mt-4 text-sm text-gray-400">
                Leading provider of professional photography equipment since 1990.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/shipping" className="text-sm text-gray-400 hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-sm text-gray-400 hover:text-white">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-sm text-gray-400">1234 Camera Street</li>
                <li className="text-sm text-gray-400">Photo City, PC 12345</li>
                <li className="text-sm text-gray-400">contact@photopixel.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2025 Photo Pixel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}