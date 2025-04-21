import express, { Router, Response } from 'express';
import { IAuthRequest } from '.../.../middlewares/isAuthenticated'; // Update path if needed
import { Cart } from '../models/cart.model'; // Rename and import correctly

const router: Router = express.Router();

router.get('/', async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const cartItems = await Cart.find({ user: userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

router.post('/', async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({ user: userId, product: productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      const newItem = new Cart({ user: userId, product: productId, quantity });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

router.put('/:id', async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;

    const updatedItem = await Cart.findByIdAndUpdate(itemId, { quantity }, { new: true });

    if (!updatedItem) {
      res.status(404).json({ error: 'Cart item not found' });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

router.delete('/:id', async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedItem) {
      res.status(404).json({ error: 'Cart item not found' });
      return;
    }

    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

export default router;
