import { useCart } from '../context/Cartcontext';
import { ShoppingCart, Shield, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export function Battery() {
  const { addToCart } = useCart();

  const batteries = [
    {
      id: 'bat1',
      name: 'Pro Series Battery Pack',
      price: 89.99,
      description: 'High-capacity professional battery with extended life',
      image: '/images/batteries/pro-battery.jpg',
      inStock: true,
      isProGrade: true
    },
    {
      id: 'bat2',
      name: 'Dual Battery Charger',
      price: 59.99,
      description: 'Fast-charging dual battery station',
      image: '/images/batteries/charger.jpg',
      inStock: true,
      isProGrade: true
    },
    {
      id: 'bat3',
      name: 'Backup Battery Pack',
      price: 49.99,
      description: 'Reliable backup battery for extended shoots',
      image: '/images/batteries/backup-battery.jpg',
      inStock: true,
      isProGrade: false
    },
    // Add more batteries as needed
  ];

  const handleAddToCart = (battery: any) => {
    addToCart({
      id: battery.id,
      name: battery.name,
      price: battery.price,
      quantity: 1,
      image: battery.image
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Professional Batteries</h1>
          <p className="text-xl text-gray-600 mt-2">Long-lasting power for your equipment</p>
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
        {batteries.map((battery) => (
          <div key={battery.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={battery.image}
                alt={battery.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {battery.inStock && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    In Stock
                  </span>
                )}
                {battery.isProGrade && (
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                    Professional Grade
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{battery.name}</h3>
              <p className="text-gray-600 mt-2">{battery.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">${battery.price}</span>
                <button
                  onClick={() => handleAddToCart(battery)}
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
} 