import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, Clock, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const cameras = [
  {
    _id: '1',
    name: 'Canon EOS R5',
    price: 324900,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: '45MP Full-Frame Mirrorless Camera',
    specs: ['45MP Full-Frame CMOS Sensor', '8K RAW Video Recording', 'Dual Card Slots', 'In-Body Image Stabilization'],
    rating: 4.9,
    reviews: 128,
    stock: 10,
    category: 'Cameras',
    features: [
      'Advanced Dual Pixel CMOS AF II',
      'Up to 20fps Electronic Shutter',
      'Subject Detection AF',
      'Weather-Sealed Construction'
    ]
  },
  {
    _id: '2',
    name: 'Sony A7 IV',
    price: 209990,
    imageUrl: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: '33MP Full-Frame Mirrorless Camera',
    specs: ['33MP Full-Frame Sensor', '4K 60p Video', '10fps Continuous Shooting', 'Advanced AF System'],
    rating: 4.8,
    reviews: 95,
    stock: 15,
    category: 'Cameras',
    features: [
      'Real-time Eye AF',
      'Creative Look Presets',
      'S-Cinetone Color Science',
      'Enhanced Heat Dissipation'
    ]
  },
  {
    _id: '3',
    name: 'Nikon Z6 II',
    price: 164990,
    imageUrl: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80',
    description: '24.5MP Full-Frame Mirrorless Camera',
    specs: ['24.5MP BSI Sensor', 'Dual EXPEED 6 Processors', '14fps Continuous Shooting', 'Dual Memory Card Slots'],
    rating: 4.7,
    reviews: 82,
    stock: 12,
    category: 'Cameras',
    features: [
      '273-Point AF System',
      'ProRes RAW Output',
      'Weather-Sealed Body',
      '5-Axis VR Stabilization'
    ]
  },
  {
    _id: '4',
    name: 'Fujifilm X-T4',
    price: 149990,
    imageUrl: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
    description: '26.1MP APS-C Mirrorless Camera',
    specs: ['26.1MP X-Trans Sensor', '6.5-Stop IBIS', '4K/60p Video', '15fps Mechanical Shutter'],
    rating: 4.8,
    reviews: 76,
    stock: 8,
    category: 'Cameras',
    features: [
      'Film Simulation Modes',
      'Vari-angle LCD Screen',
      'Enhanced Battery Life',
      'Dual UHS-II Card Slots'
    ]
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const Cameras = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (camera: any) => {
    addToCart(camera);
    toast.success(`${camera.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleBuyNow = (camera: any) => {
    navigate('/payment', { state: { product: camera } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Professional Cameras</h1>
            <p className="mt-2 text-gray-600">Discover our selection of high-end cameras for professionals</p>
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
          {cameras.map((camera) => (
            <div key={camera._id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={camera.imageUrl}
                  alt={camera.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Best Seller
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{camera.name}</h3>
                    <p className="text-gray-600">{camera.description}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(camera.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill={i < Math.floor(camera.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({camera.reviews})</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {camera.features.map((feature, index) => (
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
                    {camera.specs.map((spec, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(camera.price)}</span>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Ships in 24 hours</span>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <button 
                      onClick={() => handleAddToCart(camera)}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(camera)}
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

export default Cameras;