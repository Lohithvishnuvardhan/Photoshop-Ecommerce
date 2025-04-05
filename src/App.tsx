import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import Cameras from './pages/Camera';
import Lenses from './pages/Lenses';
import Accessories from './pages/Accessories';
import Batteries from './pages/Batteries';
import About from './pages/About';
import Contact from './pages/Contact';
import { CartProvider } from './context/Cartcontext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
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
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;