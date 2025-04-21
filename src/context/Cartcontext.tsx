import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../api';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await cartAPI.getCart();
      const cartItems = response.map((item: any) => ({
        _id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.imageUrl
      }));
      setCart(cartItems);
    } catch (error: any) {
      toast.error('Failed to fetch cart', { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (product: any) => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        const response = await cartAPI.addToCart(product._id, 1);
        setCart(response.products.map((item: any) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.imageUrl
        })));
        toast.success('Added to cart', { duration: 2000 });
      } else {
        // Handle guest cart in localStorage
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
          await updateQuantity(product._id, existingItem.quantity + 1);
        } else {
          const newItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
          };
          setCart([...cart, newItem]);
          localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
          toast.success('Added to cart', { duration: 2000 });
        }
      }
    } catch (error: any) {
      toast.error('Failed to add item to cart', { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      if (quantity < 1) {
        await removeFromCart(productId);
        return;
      }

      if (isAuthenticated) {
        const response = await cartAPI.updateQuantity(productId, quantity);
        setCart(response.products.map((item: any) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.imageUrl
        })));
      } else {
        // Handle guest cart in localStorage
        const updatedCart = cart.map(item =>
          item._id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      toast.success('Cart updated', { duration: 2000 });
    } catch (error: any) {
      toast.error('Failed to update cart', { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await cartAPI.removeFromCart(productId);
        const response = await cartAPI.getCart();
        setCart(response.map((item: any) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.imageUrl
        })));
      } else {
        // Handle guest cart in localStorage
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      toast.success('Item removed from cart', { duration: 2000 });
    } catch (error: any) {
      toast.error('Failed to remove item from cart', { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await cartAPI.clearCart();
      }
      setCart([]);
      localStorage.removeItem('cart');
      toast.success('Cart cleared', { duration: 2000 });
    } catch (error: any) {
      toast.error('Failed to clear cart', { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Sync local cart with backend when user logs in
  const syncCartWithBackend = async () => {
    if (isAuthenticated) {
      try {
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          const items = JSON.parse(localCart);
          await cartAPI.syncCart(items);
          await fetchCart();
          localStorage.removeItem('cart');
        }
      } catch (error: any) {
        console.error('Failed to sync cart:', error);
      }
    }
  };

  // Sync cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      syncCartWithBackend();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}