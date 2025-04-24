import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Camera, ShoppingCart, User, Search, LogOut, X, Menu } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore(state => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    // Your existing search logic here
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      logout();
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <Camera className="h-10 w-10 text-purple-500" />
              <span className="font-bold text-2xl text-white tracking-tight">Photo Pixel</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-12 relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for cameras, lenses, accessories..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                  {/* Your search results rendering logic */}
                </div>
              )}
            </div>

            {/* Navigation and Auth */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/cart" 
                className="relative text-gray-300 hover:text-white transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                    <User className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="text-gray-300 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:block py-4">
            <div className="flex justify-center space-x-12">
              <Link to="/cameras" className="text-gray-300 hover:text-white transition-colors">
                Cameras
              </Link>
              <Link to="/lenses" className="text-gray-300 hover:text-white transition-colors">
                Lenses
              </Link>
              <Link to="/accessories" className="text-gray-300 hover:text-white transition-colors">
                Accessories
              </Link>
              <Link to="/batteries" className="text-gray-300 hover:text-white transition-colors">
                Batteries
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <Link to="/cameras" className="text-gray-300 hover:text-white">Cameras</Link>
                <Link to="/lenses" className="text-gray-300 hover:text-white">Lenses</Link>
                <Link to="/accessories" className="text-gray-300 hover:text-white">Accessories</Link>
                <Link to="/batteries" className="text-gray-300 hover:text-white">Batteries</Link>
                <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Professional photography equipment for every level of expertise.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping Info</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-white">Track Order</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Photo Pixel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}