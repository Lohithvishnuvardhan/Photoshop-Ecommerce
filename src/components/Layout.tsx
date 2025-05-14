import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, Camera } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setShowResults] = useState(false);
  const [, setSearchResults] = useState<any[]>([]);
  const [, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore(state => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navTimeoutRef = useRef<NodeJS.Timeout>();
  const visibilityTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (event.clientY <= 100) {
        setShowNav(true);
        
        if (navTimeoutRef.current) {
          clearTimeout(navTimeoutRef.current);
        }
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }

        visibilityTimeoutRef.current = setTimeout(() => {
          setShowNav(false);
        }, 3000);
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (navTimeoutRef.current) {
        clearTimeout(navTimeoutRef.current);
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, []);

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

    const searchTermLower = query.toLowerCase();
    if (searchTermLower.includes('camera')) {
      navigate('/cameras');
    } else if (searchTermLower.includes('lens')) {
      navigate('/lenses');
    } else if (searchTermLower.includes('accessory') || searchTermLower.includes('accessories')) {
      navigate('/accessories');
    } else if (searchTermLower.includes('battery') || searchTermLower.includes('batteries')) {
      navigate('/batteries');
    }
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
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavClick = () => {
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current);
    }
    visibilityTimeoutRef.current = setTimeout(() => {
      setShowNav(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-x-hidden">
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
            <Link to="/" className="flex items-center space-x-3">
              <Camera className="h-8 w-8 md:h-12 md:w-12 text-amber-500" strokeWidth={1.5} />
              <span className="text-3xl md:text-5xl font-extrabold italic bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-transparent bg-clip-text font-sans tracking-tight hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 transition-all duration-300">
                Photo Pixel
              </span>
            </Link>

            <div className="flex-1 max-w-3xl mx-auto md:mx-12 relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for cameras, lenses, accessories..."
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base md:text-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 md:space-x-8">
              <Link 
                to="/cart" 
                className="relative text-purple-400 hover:text-purple-300 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-6 w-6 md:h-8 md:w-8" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs md:text-sm font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4 md:space-x-6">
                  <Link to="/profile" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <User className="h-6 w-6 md:h-8 md:w-8" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                  >
                    <LogOut className="h-6 w-6 md:h-8 md:w-8" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-purple-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-purple-700 transition-colors text-base md:text-lg font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <div 
            className={`absolute left-0 right-0 bg-gray-900 border-b border-gray-800 transition-all duration-300 ${
              showNav ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onMouseEnter={() => {
              setShowNav(true);
              if (visibilityTimeoutRef.current) {
                clearTimeout(visibilityTimeoutRef.current);
              }
              visibilityTimeoutRef.current = setTimeout(() => {
                setShowNav(false);
              }, 20000);
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4">
                <div className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-8 lg:space-x-12">
                  <Link 
                    to="/cameras" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    Cameras
                  </Link>
                  <Link 
                    to="/lenses" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    Lenses
                  </Link>
                  <Link 
                    to="/accessories" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    Accessories
                  </Link>
                  <Link 
                    to="/batteries" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    Batteries
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    About
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    Contact
                  </Link>
                  {isAuthenticated && isAdmin && (
                    <>
                      <Link 
                        to="/admin/dashboard" 
                        className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                        onClick={handleNavClick}
                      >
                        Admin Dashboard
                      </Link>
                      <Link 
                        to="/admin/products" 
                        className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                        onClick={handleNavClick}
                      >
                        Manage Products
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">About Us</h3>
              <p className="text-purple-300">Professional photography equipment for every level of expertise.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-purple-300 hover:text-purple-200">About</Link></li>
                <li><Link to="/contact" className="text-purple-300 hover:text-purple-200">Contact</Link></li>
                <li><Link to="/faq" className="text-purple-300 hover:text-purple-200">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-purple-300 hover:text-purple-200">Shipping Info</Link></li>
                <li><Link to="/returns" className="text-purple-300 hover:text-purple-200">Returns</Link></li>
                <li><Link to="/track-order" className="text-purple-300 hover:text-purple-200">Track Order</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-purple-300">
            <p>&copy; 2024 Photo Pixel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

export { Layout };