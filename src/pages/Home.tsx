import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Clock } from 'lucide-react';

 import.meta.env.VITE_API_URL;
export function Home() {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Canon EOS R5",
      price: 324900,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
      rating: 4.9
    },
    {
      id: 2,
      name: "Sony A7 IV",
      price: 209990,
      image: "https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80",
      rating: 4.8
    },
    {
      id: 3,
      name: "Nikon Z6 II",
      price: 164990,
      image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80",
      rating: 4.7
    }
  ];

  const handleShopNow = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-900">
      {/* Hero Section with Video Background */}
      <div className="relative h-[80vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848"
        >
          <source src="https://player.vimeo.com/external/373839467.sd.mp4?s=30d44b3a1c0df4c84551c9ff2876c8b0c72d8701&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
              Capture Life's <span className="text-purple-500">Perfect</span> Moments
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Professional photography equipment for every level of expertise. From beginners to pros, find your perfect gear.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleShopNow}
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/about"
                className="inline-flex items-center bg-white bg-opacity-20 text-white px-8 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center">
              <Shield className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">Secure Shopping</h3>
                <p className="text-gray-400 text-sm">100% Protected Payments</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Truck className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">Free Shipping</h3>
                <p className="text-gray-400 text-sm">On orders over ₹50,000</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">24/7 Support</h3>
                <p className="text-gray-400 text-sm">Dedicated customer care</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Star className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">Premium Quality</h3>
                <p className="text-gray-400 text-sm">Authorized Retailer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                        }`}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-gray-400">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Link
                      to={`/cameras`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive deals, photography tips, and early access to new products.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white bg-opacity-20 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-gray-300 max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">Professional Photography Equipment</h2>
            <p className="mb-4">
              Welcome to PhotoPro, your premier destination for professional photography equipment in India. We offer a comprehensive selection of high-quality cameras, lenses, and accessories from leading brands like Canon, Sony, Nikon, and more.
            </p>
            <p className="mb-4">
              Whether you're a professional photographer or an enthusiast, our expert team is here to help you find the perfect equipment for your needs. We pride ourselves on offering competitive prices, authentic products, and exceptional customer service.
            </p>
            <p>
              Explore our wide range of digital cameras, mirrorless cameras, DSLR cameras, professional lenses, camera accessories, and photography gear. All our products come with manufacturer warranty and after-sales support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}