const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
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

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
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
    
    if (!savedOrder) {
      throw new Error('Failed to save order');
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ 
      message: 'Failed to create order',
      error: err.message 
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error('Order fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};