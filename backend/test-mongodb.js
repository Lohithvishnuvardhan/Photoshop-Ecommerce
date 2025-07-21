const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('📍 MongoDB URI:', process.env.MONGO_URI ? 'Set ✅' : 'Missing ❌');
    
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI environment variable is not set');
      console.log('💡 Please create a .env file in the backend directory with your MongoDB connection string');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    // Test if we can create a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ test: 'connection test' });
    await testDoc.save();
    console.log('✅ Database write test successful');
    
    await TestModel.deleteOne({ test: 'connection test' });
    console.log('✅ Database delete test successful');
    
    console.log('🎉 All MongoDB tests passed!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your MongoDB connection string');
    console.log('2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify your username and password');
    console.log('4. Check if your cluster is running');
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

testMongoConnection();