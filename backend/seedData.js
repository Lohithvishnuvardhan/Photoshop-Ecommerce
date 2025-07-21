const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  // Cameras
  {
    name: 'Canon EOS R5',
    description: '45MP Full-Frame Mirrorless Camera with 8K Video',
    price: 324900,
    category: 'Cameras',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    stock: 10,
    featured: true
  },
  {
    name: 'Sony A7 IV',
    description: '33MP Full-Frame Mirrorless Camera',
    price: 209990,
    category: 'Cameras',
    imageUrl: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    stock: 15,
    featured: true
  },
  {
    name: 'Nikon Z6 II',
    description: '24.5MP Full-Frame Mirrorless Camera',
    price: 164990,
    category: 'Cameras',
    imageUrl: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80',
    stock: 12
  },
  
  // Lenses
  {
    name: 'Canon RF 24-70mm f/2.8L IS USM',
    description: 'Professional Standard Zoom Lens',
    price: 219990,
    category: 'Lenses',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    stock: 8
  },
  {
    name: 'Sony FE 70-200mm f/2.8 GM II',
    description: 'Professional Telephoto Zoom Lens',
    price: 259990,
    category: 'Lenses',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    stock: 5
  },
  
  // Accessories
  {
    name: 'Peak Design Camera Strap',
    description: 'Professional Camera Strap with Quick-Release System',
    price: 5990,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    stock: 25
  },
  {
    name: 'Manfrotto Carbon Fiber Tripod',
    description: 'Professional Carbon Fiber Tripod',
    price: 24990,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    stock: 15
  },
  
  // Batteries
  {
    name: 'Canon LP-E6NH Battery',
    description: 'High Capacity Battery for Canon EOS R Series',
    price: 14000,
    category: 'Batteries',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    stock: 30
  },
  {
    name: 'Sony NP-FZ100 Battery',
    description: 'Professional Battery for Sony Alpha Cameras',
    price: 12990,
    category: 'Batteries',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    stock: 25
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});

    console.log('🌱 Seeding products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${products.length} products`);

    console.log('📊 Products by category:');
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} products`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

seedDatabase();