import { useCart } from '../context/Cartcontext';

interface Lens {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number; // Ensure quantity is part of the type
}

// Explicitly set `lenses` array to `Lens[]`
const lenses: Lens[] = [
  {
    id: 5,
    name: 'Canon RF 24-70mm f/2.8L',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    description: 'Professional Standard Zoom Lens',
    quantity: 1, // Ensure quantity exists
  },
  {
    id: 6,
    name: 'Sony FE 70-200mm f/2.8 GM',
    price: 2599,
    image: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&q=80',
    description: 'Telephoto Zoom Lens',
    quantity: 1, // Ensure quantity exists
  },
  {
    id: 7,
    name: 'Nikon Z 50mm f/1.8 S',
    price: 599,
    image: 'https://images.unsplash.com/photo-1617005082275-6b5a2ddab409?auto=format&fit=crop&q=80',
    description: 'Standard Prime Lens',
    quantity: 1, // Ensure quantity exists
  },
  {
    id: 8,
    name: 'Sigma 85mm f/1.4 DG DN Art',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1617005082396-b214c6c24ee7?auto=format&fit=crop&q=80',
    description: 'Portrait Prime Lens',
    quantity: 1, // Ensure quantity exists
  },
];

const Lenses = () => {
  const { addToCart } = useCart() || {};

  // Ensure that lens always has quantity before passing it to addToCart
  const handleAddToCart = (lens: Lens) => {
    if (typeof addToCart === 'function') {
      addToCart(lens);
    } else {
      console.error('addToCart function is not available');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Camera Lenses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lenses.map((lens) => (
          <div key={lens.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={lens.image}
              alt={lens.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{lens.name}</h3>
              <p className="text-gray-600 mb-2">{lens.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${lens.price}</span>
                <button 
                  onClick={() => handleAddToCart(lens)}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
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

export default Lenses;
