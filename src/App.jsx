import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/admin/ProtectedRoute';
import './App.css';

// Public routes - lazy load where appropriate
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

// Admin routes - lazy loaded (code splitting)
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const Categories = lazy(() => import('./pages/admin/Categories'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Users = lazy(() => import('./pages/admin/Users'));
const Reviews = lazy(() => import('./pages/admin/Reviews'));
const Coupons = lazy(() => import('./pages/admin/Coupons'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Settings = lazy(() => import('./pages/admin/Settings'));

// Loading component for admin routes
const AdminLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading admin panel...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - Lazy loaded for code splitting */}
        <Route
          path="/admin/login"
          element={
            <AdminAuthProvider>
              <Suspense fallback={<AdminLoadingFallback />}>
                <AdminLogin />
              </Suspense>
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminAuthProvider>
              <ProtectedRoute>
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Suspense fallback={<AdminLoadingFallback />}><Dashboard /></Suspense>} />
                      <Route path="products" element={<Suspense fallback={<AdminLoadingFallback />}><AdminProducts /></Suspense>} />
                      <Route path="categories" element={<Suspense fallback={<AdminLoadingFallback />}><Categories /></Suspense>} />
                      <Route path="orders" element={<Suspense fallback={<AdminLoadingFallback />}><Orders /></Suspense>} />
                      <Route path="users" element={<Suspense fallback={<AdminLoadingFallback />}><Users /></Suspense>} />
                      <Route path="reviews" element={<Suspense fallback={<AdminLoadingFallback />}><Reviews /></Suspense>} />
                      <Route path="coupons" element={<Suspense fallback={<AdminLoadingFallback />}><Coupons /></Suspense>} />
                      <Route path="analytics" element={<Suspense fallback={<AdminLoadingFallback />}><Analytics /></Suspense>} />
                      <Route path="settings" element={<Suspense fallback={<AdminLoadingFallback />}><Settings /></Suspense>} />
                    </Routes>
                  </AdminLayout>
                </Suspense>
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

