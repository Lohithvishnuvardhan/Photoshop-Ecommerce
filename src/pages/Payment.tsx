import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cartcontext';
import { useCartStore } from '../store/cart';

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  useCart();
  useCartStore();
  const [] = useState(false);
  const [orderItems] = useState(location.state?.items || []);
  const [] = useState(false);
  const [] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { 
          state: { 
            from: location.pathname,
            paymentData: {
              items: orderItems,
              isBuyNow: location.state?.isBuyNow
            }
          },
          replace: true
        });
        return false;
      }
      return true;
    };

    if (!checkAuth()) {
      return;
    }
  }, [navigate, location, orderItems]);

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum: number, item: { price: number; quantity: number; }) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 999;
    return {
      subtotal,
      shipping,
      final: subtotal + shipping
    };
  };

  calculateTotal();




  // Rest of the component remains the same...
  // (Keep all the JSX and UI rendering code unchanged)
}