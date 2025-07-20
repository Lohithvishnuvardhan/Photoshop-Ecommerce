
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    
    console.log('Testing environment variables...');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Missing');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Missing');
    
    console.log('Testing bcrypt...');
    const testHash = await bcrypt.hash('test123', 10);
    const testMatch = await bcrypt.compare('test123', testHash);
    console.log('Bcrypt test:', testMatch ? '✅ Working' : '❌ Failed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    process.exit(1);
  }
}

testConnection();
