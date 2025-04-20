import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addToCart: (product: any) => Promise<void>;
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

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product: any) => {
    try {
      setIsLoading(true);
      
      // Transform the product to match CartItem structure
      const cartProduct = {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl || product.image,
        category: product.category || '',
        stock: product.stock || 10
      };

      // Update local cart state
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
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
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