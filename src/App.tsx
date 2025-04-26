import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
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
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/Cartcontext';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Something went wrong:</h1>
        <pre className="mt-2 text-gray-700">{error.message}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SearchProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="cameras" element={<Cameras />} />
                <Route path="lenses" element={<Lenses />} />
                <Route path="accessories" element={<Accessories />} />
                <Route path="batteries" element={<Batteries />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                <Route path="cart" element={<CartPage />} />
                <Route path="shipping" element={<ShippingInfo />} />
                <Route path="returns" element={<Returns />} />
                <Route path="faq" element={<FAQ />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </SearchProvider>
    </ErrorBoundary>
  );
}

export default App;