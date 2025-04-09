import express from 'express';
import Order from '../models/orderModel.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { orderItems, totalPrice, user } = req.body;

    const order = await Order.create({
      orderItems,
      totalPrice,
      user
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user orders
router.get('/myorders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;