const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// Create or update cart
router.post('/:userId', async (req, res) => {
  try {
    const { products } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { products } },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get cart by userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
