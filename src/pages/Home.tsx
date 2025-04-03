
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848"
          alt="Photography Equipment"
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl font-bold mb-4">Professional Photography Equipment</h1>
            <p className="text-xl mb-8">Capture moments with precision and clarity</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-white">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/products/cameras"
            className="group relative rounded-lg overflow-hidden bg-gray-800"
          >
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
              alt="Cameras"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 opacity-75"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
              <h3 className="text-white text-2xl font-bold">Cameras</h3>
            </div>
          </Link>
          <Link
            to="/products/lenses"
            className="group relative rounded-lg overflow-hidden bg-gray-800"
          >
            <img
              src="https://images.unsplash.com/photo-1617005082133-548c4dd27f35"
              alt="Lenses"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 opacity-75"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
              <h3 className="text-white text-2xl font-bold">Lenses</h3>
            </div>
          </Link>
          <Link
            to="/products/accessories"
            className="group relative rounded-lg overflow-hidden bg-gray-800"
          >
            <img
              src="https://images.unsplash.com/photo-1598460880248-71ec6d2d582b"
              alt="Accessories"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 opacity-75"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
              <h3 className="text-white text-2xl font-bold">Accessories</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for the latest products and photography tips
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}