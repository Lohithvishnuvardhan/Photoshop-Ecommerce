
import { useCart } from '../context/Cartcontext';

const cameras = [
  {
    id: 1,
    name: 'Canon EOS R5',
    price: 3899,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: '45MP Full-Frame Mirrorless Camera',
  },
  {
    id: 2,
    name: 'Sony A7 IV',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: '33MP Full-Frame Mirrorless Camera',
  },
  {
    id: 3,
    name: 'Nikon Z6 II',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80',
    description: '24.5MP Full-Frame Mirrorless Camera',
  },
  {
    id: 4,
    name: 'Fujifilm X-T4',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
    description: '26.1MP APS-C Mirrorless Camera',
  },
];

const Cameras = () => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Digital Cameras</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <div key={camera.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={camera.image}
              alt={camera.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{camera.name}</h3>
              <p className="text-gray-600 mb-2">{camera.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${camera.price}</span>
                <button 
                  onClick={() => addToCart(camera)}
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

export default Cameras;