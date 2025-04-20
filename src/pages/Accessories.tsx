import { useCart } from '../context/Cartcontext';
import { ShoppingCart, Shield, Truck } from 'lucide-react';
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
    ],
    inStock: true,
    isProGrade: true
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
    ],
    inStock: true,
    isProGrade: true
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
    ],
    inStock: true,
    isProGrade: true
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
    ],
    inStock: true,
    isProGrade: true
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

  const handleAddToCart = (accessory: any) => {
    const product = {
      _id: accessory._id || accessory.id,
      name: accessory.name,
      price: accessory.price,
      description: accessory.description,
      imageUrl: accessory.imageUrl || accessory.image,
      category: 'Accessories',
      stock: accessory.stock || 10
    };
    
    addToCart(product);
    toast.success(`${accessory.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Professional Accessories</h1>
          <p className="text-xl text-gray-600 mt-2">Essential gear for your photography needs</p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center text-green-600">
            <Truck className="w-6 h-6 mr-2" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center text-purple-600">
            <Shield className="w-6 h-6 mr-2" />
            <span>Warranty Included</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={accessory.image}
                alt={accessory.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {accessory.inStock && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    In Stock
                  </span>
                )}
                {accessory.isProGrade && (
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                    Professional Grade
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{accessory.name}</h3>
              <p className="text-gray-600 mt-2">{accessory.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(accessory.price)}</span>
                <button
                  onClick={() => handleAddToCart(accessory)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;