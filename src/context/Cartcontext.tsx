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
  syncLocalCartToBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        if (!isLoggedIn()) {
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
          return;
        }
        const data = await cartAPI.getCart();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Failed to fetch cart');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product: any) => {
    try {
      setIsLoading(true);
      
      const cartProduct = {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl || product.image,
        category: product.category || '',
        stock: product.stock || 10
      };

      if (!isLoggedIn()) {
        setCart(prev => {
          const exists = prev.find(item => item.product._id === cartProduct._id);
          if (exists) {
            return prev.map(item =>
              item.product._id === cartProduct._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prev, { product: cartProduct, quantity: 1 }];
        });
        toast.success('Item added to cart');
        return;
      }

      await cartAPI.addToCart(cartProduct._id, 1);
      
      setCart(prev => {
        const exists = prev.find(item => item.product._id === cartProduct._id);
        if (exists) {
          return prev.map(item =>
            item.product._id === cartProduct._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product: cartProduct, quantity: 1 }];
      });
      
      toast.success('Item added to cart');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      if (error.message === 'Unauthorized') {
        toast.error('Please login to add items to cart');
      } else {
        toast.error(error.message || 'Failed to add item to cart');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      if (isLoggedIn()) {
        await cartAPI.removeFromCart(productId);
      }
      setCart(prev => prev.filter(item => item.product._id !== productId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      setIsLoading(true);
      if (isLoggedIn()) {
        await cartAPI.updateQuantity(productId, quantity);
      }
      setCart(prev =>
        prev.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Add sync function
  const syncCartWithBackend = async () => {
    if (!localStorage.getItem('token')) return;
    
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  // Sync cart when component mounts and when token changes
  useEffect(() => {
    syncCartWithBackend();
  }, []);

  // Add function to sync local cart with backend when user logs in
  const syncLocalCartToBackend = async () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        for (const item of parsedCart) {
          await cartAPI.addToCart(item.product._id, item.quantity);
        }
        localStorage.removeItem('cart');
        await syncCartWithBackend();
      } catch (error) {
        console.error('Error syncing local cart:', error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      isLoading,
      total,
      syncLocalCartToBackend
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