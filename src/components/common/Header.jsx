import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, User, Phone, Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const { categories } = useProducts();
  
  // Calculate cart items count locally to avoid context re-renders
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const features = [
    { icon: Truck, text: 'Fast Delivery', subtext: 'Anywhere in Bangladesh' },
    { icon: RotateCcw, text: 'Easy Returns', subtext: 'Within 7 days' },
    { icon: Headphones, text: '24/7 Support', subtext: 'Customer care' },
    { icon: CreditCard, text: 'Cash on Delivery', subtext: 'Pay after delivery' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const wishlistItemCount = wishlist?.length || 0;

  return (
    <header className={`bg-red-600 text-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar with Features */}
      <div className="bg-red-700 py-2 hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 md:space-x-6 overflow-x-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-1.5 md:space-x-2 text-center md:text-left justify-center md:justify-start flex-shrink-0"
              >
                <div className="bg-white/20 p-1 md:p-1.5 rounded flex-shrink-0">
                  <feature.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xs md:text-sm whitespace-nowrap">{feature.text}</h3>
                  <p className="text-xs text-white/90 hidden md:block">{feature.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo - Clickable Home Button */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="text-lg sm:text-xl md:text-2xl font-bold hover:text-red-200 transition-colors whitespace-nowrap"
            >
              halchash.com
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="hover:text-red-200 transition-colors font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="hover:text-red-200 transition-colors font-medium flex items-center">
                Categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {categories?.slice(0, 8).map((category) => (
                    <Link
                      key={category._id}
                      to={`/products?category=${category._id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/wishlist" className="hover:text-red-200 transition-colors font-medium">
              Wishlist
            </Link>
            <a href="tel:01911880502" className="hover:text-red-200 transition-colors font-medium flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 md:mx-4 hidden sm:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 md:px-4 py-1.5 md:py-2 pl-8 md:pl-10 pr-3 md:pr-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm md:text-base"
              />
              <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-1.5 md:p-2 hover:bg-red-700 rounded-full transition-colors"
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 bg-white text-red-600 text-[10px] md:text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-1.5 md:p-2 hover:bg-red-700 rounded-full transition-colors"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 bg-white text-red-600 text-[10px] md:text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {user ? (
              <Link
                to="/profile"
                className="p-1.5 md:p-2 hover:bg-red-700 rounded-full transition-colors"
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            ) : (
              <Link
                to="/auth"
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors text-sm md:text-base"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-1.5 hover:bg-red-700 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Search Button */}
            <Link
              to="/products"
              className="sm:hidden p-1.5 hover:bg-red-700 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-red-500 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="hover:text-red-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <div className="font-medium text-red-200">Categories</div>
                <div className="pl-4 space-y-1">
                  {categories?.slice(0, 6).map((category) => (
                    <Link
                      key={category._id}
                      to={`/products?category=${category._id}`}
                      className="block text-sm hover:text-red-200 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/wishlist"
                className="hover:text-red-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist ({wishlistItemCount})
              </Link>
              <a
                href="tel:01911880502"
                className="hover:text-red-200 transition-colors font-medium flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              {!user && (
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-white text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

