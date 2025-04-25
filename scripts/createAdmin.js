const mongoose = require('../backend/models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    const User = mongoose.model('User');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();