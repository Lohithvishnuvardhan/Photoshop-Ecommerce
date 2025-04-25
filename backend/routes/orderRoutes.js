const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { orderItems, totalPrice, shippingAddress } = req.body;
    
    if (!orderItems?.length || !totalPrice || !shippingAddress) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          orderItems: !orderItems?.length,
          totalPrice: !totalPrice,
          shippingAddress: !shippingAddress
        }
      });
    }

    const newOrder = new Order({
      user: req.user.id,
      orderItems: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image || item.imageUrl,
        price: item.price
      })),
      shippingAddress,
      totalPrice,
      status: 'Processing'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ 
      message: 'Failed to create order',
      error: err.message 
    });
  }
});

router.get('/myorders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
      
    res.json(orders);
  } catch (err) {
    console.error('Order fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;