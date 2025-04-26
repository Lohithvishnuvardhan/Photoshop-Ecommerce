const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  isDefault: { type: Boolean, default: true }
});

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true,
    select: false
  },
  phoneNumber: { 
    type: String 
  },
  addresses: [addressSchema],
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { 
  timestamps: true 
});

// Only create the model if it hasn't been registered yet
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;