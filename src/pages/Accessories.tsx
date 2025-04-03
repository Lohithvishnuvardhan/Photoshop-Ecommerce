
import { useCart } from '../context/Cartcontext';

const accessories = [
  {
    id: 9,
    name: 'Peak Design Camera Strap',
    price: 69.95,
    image: 'https://images.unsplash.com/photo-1617005082275-6b5a2ddab409?auto=format&fit=crop&q=80',
    description: 'Comfortable and Secure Camera Strap',
  },
  {
    id: 10,
    name: 'Manfrotto Tripod',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1617005082396-b214c6c24ee7?auto=format&fit=crop&q=80',
    description: 'Professional Carbon Fiber Tripod',
  },
  {
    id: 11,
    name: 'Godox Flash',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    description: 'TTL Speedlight Flash',
  },
  {
    id: 12,
    name: 'Camera Bag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&q=80',
    description: 'Weather-resistant Camera Backpack',
  },
];

const Accessories = () => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Photography Accessories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={accessory.image}
              alt={accessory.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{accessory.name}</h3>
              <p className="text-gray-600 mb-2">{accessory.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${accessory.price}</span>
                <button 
                  onClick={() => addToCart(accessory)}
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

export default Accessories;