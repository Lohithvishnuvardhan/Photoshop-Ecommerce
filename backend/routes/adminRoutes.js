const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get dashboard stats
router.get('/dashboard', authenticateToken, isAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders: recentOrders.map(order => ({
        _id: order._id,
        customer: order.user.email,
        products: order.orderItems.length,
        total: order.totalPrice,
        status: order.status,
        date: order.createdAt
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
});

// Get all products (admin view)
router.get('/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Add new product
router.post('/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !description || !price || !category || !imageUrl || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      imageUrl,
      stock: Number(stock)
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Update product
router.put('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Get all orders (admin view)
router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status
router.put('/orders/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

module.exports = router;