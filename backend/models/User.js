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
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    select: false,
    minlength: 8
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
  resetPasswordExpires: Date,
  lastLogin: {
    type: Date,
    default: Date.now
  },
  accountStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// Index for faster email lookups
userSchema.index({ email: 1 });

// Index for password reset queries
userSchema.index({ 
  resetPasswordToken: 1, 
  resetPasswordExpires: 1 
});

module.exports = mongoose.model('User', userSchema);