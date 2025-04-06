import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const batteries = [
  {
    id: 13,
    name: 'Canon LP-E6NH Battery',
    price: 14000,
    image: 'https://tse3.mm.bing.net/th?id=OIP.1ayEyP_B-fIbGVdA3Zo5jQHaHa&w=474&h=474&c=7' ,
    description: 'High Capacity Battery for Canon  Series',
    specs: ['2130mAh Capacity', 'Up to 2030 Shots', 'USB-C Charging Compatible', 'Latest Generation']
  },
  {
    id: 14,
    name: 'Sony NP-FZ100 Battery',
    price: 12990,
    image: 'https://tse4.mm.bing.net/th?id=OIP.E_Ol9O54N7evC_y-TrEO2gHaHa&w=474&h=474&c=7',
    description: 'Professional Battery for Sony Alpha Cameras',
    specs: ['2280mAh Capacity', 'Up to 710 Shots', 'Info-Lithium Technology', 'Fast Charging Support']
  },
  {
    id: 15,
    name: 'Nikon EN-EL15c Battery',
    price: 11990,
    image: 'https://www.bhphotovideo.com/images/images2500x2500/nikon_en_el15c_rechargeable_lithium_ion_1578220.jpg',
    description: 'Advanced Battery for Nikon Z Series',
    specs: ['2280mAh Capacity', 'USB Charging', 'Enhanced Performance', 'Long Battery Life']
  },
  {
    id: 16,
    name: 'Fujifilm NP-W235 Battery',
    price: 9990,
    image: 'https://www.bhphotovideo.com/images/images2500x2500/fujifilm_16651409_np_w235_li_ion_battery_pack_1548399.jpg',
    description: 'High-Performance Battery for Fujifilm Cameras',
    specs: ['2200mAh Capacity', 'Up to 500 Shots', 'Quick Charging', 'Battery Level Indicator']
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
    <div className="min-h-screen bg-gray-100 py-12">
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
                <ul className="mb-6 space-y-2">
                  {battery.specs.map((spec, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
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