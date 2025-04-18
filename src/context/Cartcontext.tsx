import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '../api';
import toast from 'react-hot-toast';

export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    stock: number;
  };
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const data = await cartAPI.getCart();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorage.getItem('token')) {
      fetchCart();
    }
  }, []);

  const addToCart = async (item: CartItem) => {
    try {
      setIsLoading(true);
      await cartAPI.addToCart(item.product._id, 1);
      setCart(prev => {
        const exists = prev.find(cartItem => cartItem.product._id === item.product._id);
        if (exists) {
          return prev.map(cartItem =>
            cartItem.product._id === item.product._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      setIsLoading(true);
      await cartAPI.removeFromCart(id);
      setCart(prev => prev.filter(item => item.product._id !== id));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      setIsLoading(true);
      await cartAPI.updateQuantity(id, quantity);
      setCart(prev =>
        prev.map(item =>
          item.product._id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
