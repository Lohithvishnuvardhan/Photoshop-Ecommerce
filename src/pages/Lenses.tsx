import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, Clock, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const lenses = [
  {
    _id: '5',
    name: 'Canon RF 24-70mm f/2.8L IS USM',
    price: 219990,
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    description: 'Professional Standard Zoom Lens',
    specs: [
      'Constant f/2.8 Aperture',
      'Image Stabilization',
      'Nano USM AF System',
      'Weather-Sealed Construction'
    ],
    rating: 4.9,
    reviews: 156,
    stock: 8,
    category: 'Lenses',
    features: [
      'Customizable Control Ring',
      'Dust and Water Resistant',
      'Minimum Focus Distance: 0.21m',
      'Advanced Optical Design'
    ]
  },
  {
    _id: '6',
    name: 'Sony FE 70-200mm f/2.8 GM II',
    price: 259990,
    imageUrl: 'https://images.unsplash.com/photo-1617813144729-0676da0a72bc?auto=format&fit=crop&q=80',
    description: 'Professional Telephoto Zoom Lens',
    specs: [
      'Constant f/2.8 Aperture',
      'Dual XD Linear Motors',
      'Optical SteadyShot',
      'Nano AR Coating II'
    ],
    rating: 4.8,
    reviews: 92,
    stock: 5,
    category: 'Lenses',
    features: [
      'Advanced AF System',
      'Improved Close-up Performance',
      'Reduced Weight Design',
      'Dust and Moisture Resistant'
    ]
  },
  {
    _id: '7',
    name: 'Nikon Z 50mm f/1.2 S',
    price: 199990,
    imageUrl: 'https://images.unsplash.com/photo-1617813144729-0676da0a72bc?auto=format&fit=crop&q=80',
    description: 'Professional Prime Lens',
    specs: [
      'Ultra-Fast f/1.2 Aperture',
      'Multi-Focus System',
      'ARNEO Coating',
      'Customizable Control Ring'
    ],
    rating: 4.9,
    reviews: 78,
    stock: 6,
    category: 'Lenses',
    features: [
      'Superior Edge-to-Edge Sharpness',
      'Beautiful Bokeh Rendering',
      'Weather-Sealed Design',
      'Nano Crystal Coat'
    ]
  },
  {
    _id: '8',
    name: 'Sigma 14-24mm f/2.8 DG DN Art',
    price: 129990,
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    description: 'Ultra-Wide Zoom Lens',
    specs: [
      'Constant f/2.8 Aperture',
      'Mirrorless Design',
      'Super Multi-Layer Coating',
      'Brass Bayonet Mount'
    ],
    rating: 4.7,
    reviews: 64,
    stock: 10,
    category: 'Lenses',
    features: [
      'Zero Distortion Design',
      'Weather-Sealed Construction',
      'Minimum Focus: 28cm',
      'Advanced Optical Elements'
    ]
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const Lenses = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (lens: any) => {
    addToCart(lens);
    toast.success(`${lens.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleBuyNow = (lens: any) => {
    navigate('/payment', { state: { product: lens } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Professional Lenses</h1>
            <p className="mt-2 text-gray-600">Premium quality lenses for exceptional image quality</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <Truck className="h-5 w-5 mr-2" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center text-purple-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>Warranty Included</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lenses.map((lens) => (
            <div key={lens._id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={lens.imageUrl}
                  alt={lens.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Professional Grade
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {lens.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{lens.name}</h3>
                    <p className="text-gray-600">{lens.description}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(lens.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill={i < Math.floor(lens.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({lens.reviews})</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {lens.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Camera className="h-4 w-4 text-purple-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Specifications</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {lens.specs.map((spec, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(lens.price)}</span>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Ships in 24 hours</span>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <button 
                      onClick={() => handleAddToCart(lens)}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(lens)}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lenses;