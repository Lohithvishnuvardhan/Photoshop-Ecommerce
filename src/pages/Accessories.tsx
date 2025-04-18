import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const accessories = [
  {
    id: 9,
    name: 'Peak Design Camera Strap',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1520549233664-03f65c1d1327?auto=format&fit=crop&q=80',
    description: 'Professional Camera Strap with Quick-Release System',
    specs: [
      'Quick-Release System for Easy Attachment',
      'Adjustable Length from 38" to 57"',
      'Dual Adjustment Points',
      'Aircraft-Grade Aluminum Hardware',
      'Weatherproof Construction',
      'Lifetime Warranty'
    ],
    features: [
      'Compatible with All Camera Types',
      'Comfort-Padded Design',
      'Anti-Slip Technology'
    ]
  },
  {
    id: 10,
    name: 'Manfrotto MT055XPRO4 Tripod',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1542567455-cd733f23fbb1?auto=format&fit=crop&q=80',
    description: 'Professional Carbon Fiber Tripod with Advanced Features',
    specs: [
      'Carbon Fiber Construction',
      'Maximum Height: 170cm',
      'Minimum Height: 9cm',
      'Load Capacity: 9kg',
      'Weight: 2.1kg',
      'Quick Power Lock System'
    ],
    features: [
      '90° Column System',
      'Easy Link Connection',
      'Bubble Level Included'
    ]
  },
  {
    id: 11,
    name: 'Godox V1 Flash',
    price: 32990,
    image: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?auto=format&fit=crop&q=80',
    description: 'Professional Round Head Flash with Advanced Features',
    specs: [
      'Round Head Design',
      '2.4GHz Wireless System',
      '1/8000s High-Speed Sync',
      'Magnetic Modifier Mount',
      'Li-ion Battery: 480 Full Power Flashes',
      'Recycle Time: 1.5s at Full Power'
    ],
    features: [
      'TTL Auto Flash',
      'Built-in 2.4GHz X System',
      'AD200 Battery Compatible'
    ]
  },
  {
    id: 12,
    name: 'Peak Design Everyday Backpack',
    price: 21990,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80',
    description: 'Professional Camera Backpack with Innovative Design',
    specs: [
      '30L Capacity',
      'Weatherproof 400D Nylon Canvas',
      'Padded Laptop Sleeve (15")',
      'Tablet Sleeve (12.9")',
      'Weight: 1.8kg',
      'External Carry Straps'
    ],
    features: [
      'MagLatch Top Access',
      'Dual Side Access',
      'FlexFold Dividers'
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

const Accessories = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (accessory: any) => {
    addToCart(accessory);
    toast.success(`${accessory.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleBuyNow = (accessory: any) => {
    navigate('/payment', { state: { product: accessory } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Photography Accessories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{accessory.name}</h3>
                <p className="text-gray-600 mb-4">{accessory.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Specifications:</h4>
                  <ul className="space-y-2">
                    {accessory.specs.map((spec, index) => (
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
                    {accessory.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(accessory.price)}</span>
                  <div className="space-x-4">
                    <button 
                      onClick={() => handleAddToCart(accessory)}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(accessory)}
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

export default Accessories;