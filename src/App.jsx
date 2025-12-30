import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import UserOrders from './pages/UserOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import SizeGuide from './pages/SizeGuide';
import Payment from './pages/Payment';
import AfterSales from './pages/AfterSales';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Reviews from './pages/admin/Reviews';
import Coupons from './pages/admin/Coupons';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <AdminAuthProvider>
              <AdminLogin />
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminAuthProvider>
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="coupons" element={<Coupons />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            </AdminAuthProvider>
          }
        />

        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <AuthProvider>
              <ProductProvider>
                <CartProvider>
                  <WishlistProvider>
                    <div className="min-h-screen bg-gray-50">
                      <Header />
                      <main>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/auth" element={<Auth />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/shipping" element={<Shipping />} />
                            <Route path="/returns" element={<Returns />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/size-guide" element={<SizeGuide />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/after-sales" element={<AfterSales />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/profile/orders" element={<UserOrders />} />
                        </Routes>
                      </main>
                      <Footer />
                      <Toaster 
                        position="top-right"
                        toastOptions={{
                          duration: 3000,
                          style: {
                            background: '#059669',
                            color: '#fff',
                          },
                        }}
                      />
                    </div>
                  </WishlistProvider>
                </CartProvider>
              </ProductProvider>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

