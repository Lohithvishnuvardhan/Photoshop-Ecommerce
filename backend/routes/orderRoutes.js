const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticateToken = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { user, orderItems, totalPrice, status } = req.body;
    
    if (!user || !orderItems || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      user,
      orderItems,
      totalPrice,
      status: status || 'Processing',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Get orders by user ID
router.get('/myorders/:userId', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 }); // Sort by newest first
    res.json(orders);
  } catch (err) {
    console.error('Order fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;