import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const batteries = [
  {
    id: 13,
    name: 'Canon LP-E6NH Battery',
    price: 14000,
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: 'High Capacity Battery for Canon EOS R Series',
    specs: [
      '2130mAh Capacity',
      'Up to 2030 Shots per Charge',
      'USB-C Charging Compatible',
      'Latest Generation Technology',
      'Info Communication Function',
      'Fast Charging Support'
    ],
    features: [
      'Enhanced Heat Resistance',
      'Improved Performance in Cold',
      'Real-time Battery Info Display'
    ]
  },
  {
    id: 14,
    name: 'Sony NP-FZ100 Battery',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1563126343-24405c61532d?auto=format&fit=crop&q=80',
    description: 'Professional Battery for Sony Alpha Cameras',
    specs: [
      '2280mAh Capacity',
      'Up to 710 Shots per Charge',
      'Info-Lithium Technology',
      'Fast Charging Support',
      'Operating Temperature: -20°C to +60°C',
      'Weight: 83g'
    ],
    features: [
      'Accurate Power Indication',
      'Over-charge Protection',
      'Memory Effect Free'
    ]
  },
  {
    id: 15,
    name: 'Nikon EN-EL15c Battery',
    price: 11990,
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: 'Advanced Battery for Nikon Z Series',
    specs: [
      '2280mAh Capacity',
      'USB Charging Compatible',
      'Enhanced Performance',
      'Long Battery Life',
      'Operating Temperature: -10°C to +40°C',
      'Weight: 78g'
    ],
    features: [
      'Smart Battery Management',
      'Overcharge Protection',
      'Temperature Monitoring'
    ]
  },
  {
    id: 16,
    name: 'Fujifilm NP-W235 Battery',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1563126343-24405c61532d?auto=format&fit=crop&q=80',
    description: 'High-Performance Battery for Fujifilm Cameras',
    specs: [
      '2200mAh Capacity',
      'Up to 500 Shots per Charge',
      'Quick Charging Support',
      'Battery Level Indicator',
      'Operating Temperature: -10°C to +40°C',
      'Weight: 68g'
    ],
    features: [
      'Advanced Power Management',
      'Protection Circuit Built-in',
      'Extended Lifespan Design'
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

const Batteries = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (battery: any) => {
    addToCart(battery);
    toast.success(`${battery.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleBuyNow = (battery: any) => {
    navigate('/payment', { state: { product: battery } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Camera Batteries</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {batteries.map((battery) => (
            <div key={battery.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={battery.image}
                  alt={battery.name}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{battery.name}</h3>
                <p className="text-gray-600 mb-4">{battery.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Specifications:</h4>
                  <ul className="space-y-2">
                    {battery.specs.map((spec, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    {battery.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(battery.price)}</span>
                  <div className="space-x-4">
                    <button 
                      onClick={() => handleAddToCart(battery)}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(battery)}
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

export default Batteries;