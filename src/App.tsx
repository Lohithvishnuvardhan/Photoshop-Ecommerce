import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Payment } from './pages/Payment';
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
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/Cartcontext';
import { Toaster } from 'react-hot-toast';
import OrderSuccess from './pages/OrderSuccess';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

function App() {

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cameras" element={
                <PrivateRoute>
                  <Cameras />
                </PrivateRoute>
              } />
              <Route path="lenses" element={
                <PrivateRoute>
                  <Lenses />
                </PrivateRoute>
              } />
              <Route path="accessories" element={
                <PrivateRoute>
                  <Accessories />
                </PrivateRoute>
              } />
              <Route path="batteries" element={
                <PrivateRoute>
                  <Batteries />
                </PrivateRoute>
              } />
              <Route path="about" element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              } />
              <Route path="contact" element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              } />
              <Route path="profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="payment" element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              } />
              <Route path="cart" element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
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
  );
}

export default App;


