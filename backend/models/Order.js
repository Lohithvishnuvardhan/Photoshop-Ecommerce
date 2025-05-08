const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
  }
);

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    totalPrice: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      default: 'Processing',
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    paymentStatus: {
      type: String,
      default: 'Paid',
      enum: ['Paid', 'Pending', 'Failed']
    }
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model('Order', orderSchema);