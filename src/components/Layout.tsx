import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Camera, ShoppingCart, User, Search, LogOut, X } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const categories: any[] = [/* ... same as before ... */];

export function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();

    const matchingCategories = categories.filter(category =>
      category.searchTerms.some((term: string | string[]) => term.includes(normalizedQuery))
    );

    const matchingProducts = categories.flatMap(category =>
      category.products
        .filter((product: { name: string; }) => product.name.toLowerCase().includes(normalizedQuery))
        .map((product: any) => ({
          ...product,
          category: category.name,
          path: category.path
        }))
    );

    const results = [
      ...matchingCategories.map(category => ({
        id: category.id,
        name: category.name,
        isCategory: true,
        path: category.path
      })),
      ...matchingProducts
    ];

    setSearchResults(results);
    setShowResults(true);
  };

  const handleResultClick = (result: any) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(result.path);

    toast.success(
      result.isCategory ? `Browsing ${result.name}` : `Viewing ${result.name}`,
      { duration: 2000 }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    } else if (searchQuery.trim() !== '') {
      toast.error('No matching products or categories found', {
        duration: 2000,
      });
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
      toast.error('Error logging out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="h-10 w-10 text-purple-500" />
              <span className="font-bold text-2xl text-white tracking-tight">Photo Pixel</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for cameras, lenses, accessories..."
                    className="w-full pl-12 pr-12 py-3 text-lg bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        setShowResults(false);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-6 w-6 text-gray-400 hover:text-gray-300" />
                    </button>
                  )}
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <ul className="py-2">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <button
                          onClick={() => handleResultClick(result)}
                          className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white flex items-center justify-between text-lg"
                        >
                          <span className="flex items-center">
                            {result.isCategory ? (
                              <span className="font-medium">{result.name} Category</span>
                            ) : (
                              <>
                                <span>{result.name}</span>
                                <span className="ml-2 text-sm text-gray-500">
                                  in {result.category}
                                </span>
                              </>
                            )}
                          </span>
                          {!result.isCategory && (
                            <span className="text-purple-400">
                              ${result.price}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Cart and Auth */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/cart" 
                className="relative text-gray-300 hover:text-white"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-8 w-8" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative flex items-center space-x-4">
                  <Link to="/profile" className="text-gray-300 hover:text-white">
                    <User className="h-8 w-8" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="text-gray-300 hover:text-white disabled:opacity-50"
                    aria-label="Logout"
                  >
                    <LogOut className="h-8 w-8" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium text-lg transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="py-4">
            <div className="flex justify-center space-x-12">
              <Link
                to="/cameras"
                className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Cameras
              </Link>
              <Link
                to="/lenses"
                className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Lenses
              </Link>
              <Link
                to="/accessories"
                className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Accessories
              </Link>
              <Link
                to="/batteries"
                className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Batteries
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400 text-lg">
            <p>&copy; 2024 Photo Pixel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
