import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Payment } from './pages/Payment';
import { Orders } from './pages/Orders';
import CartPage from './pages/CartPage';
import Cameras from './pages/Camera';
import Lenses from './pages/Lenses';
import Accessories from './pages/Accessories';
import Batteries from './pages/Batteries';
import About from './pages/About';
import Contact from './pages/Contact';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { OrderSuccess } from './pages/OrderSuccess';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/Cartcontext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('token');
  
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="cameras" element={<Cameras />} />
                <Route path="lenses" element={<Lenses />} />
                <Route path="accessories" element={<Accessories />} />
                <Route path="batteries" element={<Batteries />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="payment" element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } />
                <Route path="cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                <Route path="shipping" element={<ShippingInfo />} />
                <Route path="returns" element={<Returns />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="order-success" element={<OrderSuccess />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
            </Routes>
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;