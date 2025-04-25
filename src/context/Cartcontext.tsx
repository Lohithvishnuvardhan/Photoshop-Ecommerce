import React, { createContext, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { create } from 'zustand';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartStore | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = create<CartStore>((set) => ({
    items: [],
    isLoading: false,
    addToCart: (product: any) => {
      set((state) => ({
        items: [...state.items, {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.imageUrl || product.image,
          quantity: 1
        }],
      }));
      toast.success('Added to cart');
    },
    removeFromCart: (productId: string) => {
      set((state) => ({
        items: state.items.filter((item) => item._id !== productId),
      }));
      toast.success('Removed from cart');
    },
    updateQuantity: (productId: string, quantity: number) => {
      set((state) => ({
        items: state.items.map((item) =>
          item._id === productId
            ? { ...item, quantity }
            : item
        ),
      }));
    },
    clearCart: () => {
      set(() => ({
        items: [],
      }));
      localStorage.removeItem('cart');
    },
  }));

  useAuth();

  // Load cart from localStorage on mount
  store.subscribe((state) => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  });

  return (
    <CartContext.Provider value={store.getState()}>
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