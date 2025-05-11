import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // ... existing fields ...
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export const User = mongoose.model('User', userSchema); 