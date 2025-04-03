
import { Link, Outlet } from 'react-router-dom';
import { Camera, ShoppingCart, User, Search } from 'lucide-react';
import { useCartStore } from '../store/cart';

export function Layout() {
  const cartItems = useCartStore(state => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-purple-500" />
              <span className="font-semibold text-xl text-white">PhotoPro</span>
            </Link>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-300 hover:text-white flex items-center space-x-1">
                <User className="h-6 w-6" />
                <span>Sign In</span>
              </Link>
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
              <Link to="/products/cameras" className="text-gray-300 hover:text-white">
                Cameras
              </Link>
              <Link to="/products/lenses" className="text-gray-300 hover:text-white">
                Lenses
              </Link>
              <Link to="/products/accessories" className="text-gray-300 hover:text-white">
                Accessories
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

      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <li className="text-sm text-gray-400">contact@photopro.com</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white">Newsletter</h3>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2025 PhotoPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}