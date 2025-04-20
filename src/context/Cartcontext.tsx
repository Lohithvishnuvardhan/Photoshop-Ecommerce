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
  addToCart: (product: CartItem['product']) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

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

  const addToCart = async (product: CartItem['product']) => {
    try {
      setIsLoading(true);
      await cartAPI.addToCart(product._id, 1);
      setCart(prev => {
        const exists = prev.find(cartItem => cartItem.product._id === product._id);
        if (exists) {
          return prev.map(cartItem =>
            cartItem.product._id === product._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      await cartAPI.removeFromCart(productId);
      setCart(prev => prev.filter(item => item.product._id !== productId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      setIsLoading(true);
      await cartAPI.updateQuantity(productId, quantity);
      setCart(prev =>
        prev.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
      toast.success('Cart updated');
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
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      isLoading,
      total 
    }}>
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