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

// Delete all orders
router.delete('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ message: 'Error deleting orders' });
  }
});

// Delete single order
router.delete('/orders/:orderId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
});

// Get dashboard stats
router.get('/dashboard', authenticateToken, isAdmin, async (req, res) => {
  try {
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total products
    const totalProducts = await Product.countDocuments();
    
    // Calculate total revenue
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Get orders from last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonth }
    });

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth }
    });

    const lastMonthProducts = await Product.countDocuments({
      createdAt: { $gte: lastMonth }
    });

    // Get recent orders with populated user data
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    // Calculate percentage changes
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 2);
    
    const previousMonthOrders = await Order.countDocuments({
      createdAt: { $gte: previousMonth, $lt: lastMonth }
    });

    const previousMonthUsers = await User.countDocuments({
      createdAt: { $gte: previousMonth, $lt: lastMonth }
    });

    const previousMonthProducts = await Product.countDocuments({
      createdAt: { $gte: previousMonth, $lt: lastMonth }
    });

    // Calculate percentage changes
    const orderChange = previousMonthOrders === 0 ? 100 : 
      ((lastMonthOrders - previousMonthOrders) / previousMonthOrders) * 100;
    
    const userChange = previousMonthUsers === 0 ? 100 :
      ((lastMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;
    
    const productChange = previousMonthProducts === 0 ? 100 :
      ((lastMonthProducts - previousMonthProducts) / previousMonthProducts) * 100;

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: totalRevenue[0]?.total || 0,
      orderChange: Math.round(orderChange),
      userChange: Math.round(userChange),
      productChange: Math.round(productChange),
      recentOrders: recentOrders.map(order => ({
        _id: order._id,
        customer: order.user?.name || 'Guest User',
        email: order.user?.email || 'N/A',
        products: order.orderItems.length,
        total: order.totalPrice,
        status: order.status,
        date: order.createdAt,
        orderItems: order.orderItems,
        paymentStatus: order.paymentStatus
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
});

module.exports = router;