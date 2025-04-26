const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updatePassword } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authenticateToken, getProfile);

// Update user profile
router.put('/profile', authenticateToken, updateProfile);

// Update password
router.put('/password', authenticateToken, updatePassword);

module.exports = router;