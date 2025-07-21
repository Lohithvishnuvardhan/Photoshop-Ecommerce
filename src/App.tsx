import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
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
import EditProfile from './pages/EditProfile';
import TrackOrder from './pages/TrackOrder';
import { OrderSuccess } from './pages/OrderSuccess';
import { ViewOrder } from './pages/ViewOrder';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/Cartcontext';

// Temporarily disabled authentication imports
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
// import Dashboard from './pages/admin/Dashboard';
// import Products from './pages/admin/Products';

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
          {/* Temporarily disabled AuthProvider wrapper */}
          {/* <AuthProvider> */}
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
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<EditProfile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="view-order" element={<ViewOrder />} />
                <Route path="track-order" element={<TrackOrder />} />
                <Route path="payment" element={<Payment />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="shipping" element={<ShippingInfo />} />
                <Route path="returns" element={<Returns />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="order-success" element={<OrderSuccess />} />
                
                {/* Temporarily disabled auth routes */}
                {/* <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                
                <Route path="admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
                <Route path="admin/products" element={<AdminRoute><Products /></AdminRoute>} /> */}
              </Route>
            </Routes>
          </Router>
          {/* </AuthProvider> */}
        </CartProvider>
      </SearchProvider>
    </ErrorBoundary>
  );
}

export default App;