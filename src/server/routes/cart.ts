import express, { Request, Response } from 'express';
import { Cart } from '../models/Cart';

interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const router = express.Router();

// Get user's cart
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.json({ products: [] });
    }
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add item to cart
router.post('/add', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// Update item quantity
router.put('/:productId', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products[productIndex].quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Remove item from cart
router.delete('/:productId', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
});

export default router;