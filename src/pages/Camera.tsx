import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const cameras = [
  {
    id: 1,
    name: 'Canon EOS R5',
    price: 324900,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: '45MP Full-Frame Mirrorless Camera',
    specs: ['45MP Full-Frame CMOS Sensor', '8K RAW Video Recording', 'Dual Card Slots', 'In-Body Image Stabilization']
  },
  {
    id: 2,
    name: 'Sony A7 IV',
    price: 209990,
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: '33MP Full-Frame Mirrorless Camera',
    specs: ['33MP Full-Frame Sensor', '4K 60p Video', '10fps Continuous Shooting', 'Advanced AF System']
  },
  {
    id: 3,
    name: 'Nikon Z6 II',
    price: 164990,
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80',
    description: '24.5MP Full-Frame Mirrorless Camera',
    specs: ['24.5MP BSI Sensor', 'Dual EXPEED 6 Processors', '14fps Continuous Shooting', 'Dual Memory Card Slots']
  },
  {
    id: 4,
    name: 'Fujifilm X-T4',
    price: 149990,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
    description: '26.1MP APS-C Mirrorless Camera',
    specs: ['26.1MP X-Trans Sensor', '6.5-Stop IBIS', '4K/60p Video', '15fps Mechanical Shutter']
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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Professional Cameras</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {cameras.map((camera) => (
            <div key={camera.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={camera.image}
                  alt={camera.name}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{camera.name}</h3>
                <p className="text-gray-600 mb-4">{camera.description}</p>
                <ul className="mb-6 space-y-2">
                  {camera.specs.map((spec, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(camera.price)}</span>
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