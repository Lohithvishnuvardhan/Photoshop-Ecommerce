import { useCart } from '../context/Cartcontext';

const lenses = [
  {
    id: 5,
    name: 'Canon RF 24-70mm f/2.8L',
    price: 189990,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80',
    description: 'Professional Standard Zoom Lens',
    specs: ['Constant f/2.8 Aperture', 'Nano USM AF System', 'Weather-Sealed Design', 'Control Ring']
  },
  {
    id: 6,
    name: 'Sony FE 70-200mm f/2.8 GM',
    price: 209990,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: 'Professional Telephoto Zoom Lens',
    specs: ['XA Lens Elements', 'Nano AR Coating', 'Dual SSM AF System', 'Dust and Moisture Resistant']
  },
  {
    id: 7,
    name: 'Nikon Z 50mm f/1.8 S',
    price: 47990,
    image: 'https://images.unsplash.com/photo-1495512046360-dad6e8b83667?auto=format&fit=crop&q=80',
    description: 'Standard Prime Lens',
    specs: ['Multi-Focus System', 'Nano Crystal Coat', 'Customizable Control Ring', 'Weather-Sealed']
  },
  {
    id: 8,
    name: 'Sigma 85mm f/1.4 DG DN Art',
    price: 94990,
    image: 'https://images.unsplash.com/photo-1493799228716-eee21e33b735?auto=format&fit=crop&q=80',
    description: 'Portrait Prime Lens',
    specs: ['11 Rounded Aperture Blades', 'Hypersonic AF Motor', 'Dust & Splash Proof', 'Click/De-Click Aperture Ring']
  },
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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Professional Lenses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {lenses.map((lens) => (
            <div key={lens.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={lens.image}
                  alt={lens.name}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{lens.name}</h3>
                <p className="text-gray-600 mb-4">{lens.description}</p>
                <ul className="mb-6 space-y-2">
                  {lens.specs.map((spec, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(lens.price)}</span>
                  <button 
                    onClick={() => addToCart(lens)}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Add to Cart
                  </button>
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