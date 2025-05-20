const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a response object with default values if needed
    const response = {
      _id: user._id,
      name: user.name || 'Not Available',
      email: user.email,
      phoneNumber: user.phoneNumber || 'Not Available',
      addresses: user.addresses || [],
      isAdmin: user.isAdmin
    };

    res.json(response);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, street, city, state, postalCode, country } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic info
    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update or add address
    if (street || city || state || postalCode || country) {
      const address = {
        street,
        city,
        state,
        postalCode,
        country,
        isDefault: true
      };

      if (!user.addresses) {
        user.addresses = [];
      }

      if (user.addresses.length === 0) {
        user.addresses.push(address);
      } else {
        user.addresses[0] = address;
      }
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      addresses: user.addresses,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Server error while updating password' });
  }
};