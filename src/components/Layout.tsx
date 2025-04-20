import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Camera, ShoppingCart, User, Search, LogOut, X } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

// Define categories and their search terms
const categories = [
  {
    id: 'cameras',
    name: 'Cameras',
    path: '/cameras',
    searchTerms: ['camera', 'cameras', 'dslr', 'mirrorless', 'canon', 'sony', 'nikon'],
    products: [
      { id: 1, name: 'Canon EOS R5', price: 3899 },
      { id: 2, name: 'Sony A7 IV', price: 2499 },
      { id: 3, name: 'Nikon Z6 II', price: 1999 },
    ]
  },
  {
    id: 'lenses',
    name: 'Lenses',
    path: '/lenses',
    searchTerms: ['lens', 'lenses', 'zoom', 'prime', 'wide', 'telephoto'],
    products: [
      { id: 4, name: 'Canon RF 24-70mm f/2.8', price: 2299 },
      { id: 5, name: 'Sony 50mm f/1.4', price: 999 },
      { id: 6, name: 'Nikon Z 70-200mm f/2.8', price: 2599 },
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    path: '/accessories',
    searchTerms: ['accessory', 'accessories', 'tripod', 'bag', 'filter', 'memory card'],
    products: [
      { id: 7, name: 'Camera Bag Deluxe', price: 129 },
      { id: 8, name: 'Professional Tripod', price: 299 },
      { id: 9, name: 'UV Filter Set', price: 79 },
    ]
  },
  {
    id: 'batteries',
    name: 'Batteries',
    path: '/batteries',
    searchTerms: ['battery', 'batteries', 'charger', 'power', 'pack'],
    products: [
      { id: 10, name: 'Canon LP-E6NH Battery', price: 99 },
      { id: 11, name: 'Sony NP-FZ100 Battery', price: 89 },
      { id: 12, name: 'Dual Battery Charger', price: 79 },
    ]
  }
];

export function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, logout } = useAuth();

  // Handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();

    // First, check if the search matches any category
    const matchingCategories = categories.filter(category => 
      category.searchTerms.some(term => term.includes(normalizedQuery))
    );

    // Then, check for specific products
    const matchingProducts = categories.flatMap(category =>
      category.products
        .filter(product => product.name.toLowerCase().includes(normalizedQuery))
        .map(product => ({
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

  // Handle search result click
  const handleResultClick = (result: any) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(result.path);
    
    if (result.isCategory) {
      toast.success(`Browsing ${result.name}`, {
        duration: 2000, // 2 seconds
      });
    } else {
      toast.success(`Viewing ${result.name}`, {
        duration: 2000, // 2 seconds
      });
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    } else if (searchQuery.trim() !== '') {
      toast.error('No matching products or categories found', {
        duration: 2000, // 2 seconds
      });
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token'); // Clear the token
    localStorage.removeItem('cart'); // Clear the cart data
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

            <div className="flex-1 max-w-lg mx-8 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for cameras, lenses, accessories..."
                    className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        setShowResults(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    </button>
                  )}
                </div>
              </form>

              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <ul className="py-2">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <button
                          onClick={() => handleResultClick(result)}
                          className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white flex items-center justify-between"
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

            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-6">
                  <Link to="/profile" className="text-gray-300 hover:text-white flex items-center space-x-1">
                    <User className="h-6 w-6" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                  <Link to="/cart" className="text-gray-300 hover:text-white relative">
                    <ShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
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
                </>
              )}
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