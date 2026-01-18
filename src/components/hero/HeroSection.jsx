import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { API_BASE_URL } from '../../config/api';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroProducts, setHeroProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const staticProducts = [
    {
      _id: '1',
      name: 'Premium Health Supplement',
      image: '/api/placeholder/600/400',
      discount: 20,
      category: 'supplements'
    },
    {
      _id: '2',
      name: 'Beauty Care Package',
      image: '/api/placeholder/600/400',
      discount: 15,
      category: 'beauty'
    },
    {
      _id: '3',
      name: 'Personal Care Essentials',
      image: '/api/placeholder/600/400',
      discount: 25,
      category: 'personal-care'
    },
    {
      _id: '4',
      name: 'Wellness Products',
      image: '/api/placeholder/600/400',
      discount: 30,
      category: 'wellness'
    }
  ];

  const categoryColors = {
    supplements: 'from-green-900 via-emerald-900 to-black',
    beauty: 'from-pink-900 via-rose-900 to-black',
    'personal-care': 'from-blue-900 via-indigo-900 to-black',
    wellness: 'from-purple-900 via-violet-900 to-black',
    shari: 'from-red-900 via-pink-900 to-black',
    default: 'from-purple-900 via-red-900 to-black'
  };

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '24/7', label: 'Support' },
    { number: '99%', label: 'Satisfaction' }
  ];

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        // Use dedicated hero endpoint which returns products with hero_order
        const response = await fetch(`${API_BASE_URL}/api/hero`);
        const data = await response.json();

        let sourceProducts = [];

        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          sourceProducts = data.products;
        } else {
          // Fallback to static featured products if API has none
          sourceProducts = staticProducts.slice(0, 4);
        }

        if (sourceProducts.length === 0) {
          setHeroProducts([]);
        } else {
          const slides = sourceProducts.map((product) => {
            const productImage =
              product.images && product.images.length > 0
                ? product.images[0]
                : product.image;

            const categorySlug = product.category_id?.slug || product.category || 'shari';

            return {
              id: product._id || product.id,
              title: (product.name || 'Special Product').toUpperCase().split(' ').slice(0, 2).join(' ') || 'SPECIAL',
              subtitle: (product.name || 'Special Product').toUpperCase().split(' ').slice(2).join(' ') || 'PRODUCT',
              description: product.discount ? `${product.discount}% OFF` : 'DISCOUNT',
              ctaText: 'ORDER NOW',
              image: productImage,
              discount: product.discount ? `${product.discount}%` : '50%',
              bgColor: categoryColors[categorySlug] || 'from-purple-900 via-red-900 to-black',
              category: categorySlug,
              productId: product._id || product.id,
            };
          });

          setHeroProducts(slides);
        }
      } catch (error) {
        console.error('Error fetching hero products:', error);
        setHeroProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroProducts();
  }, []);

  useEffect(() => {
    if (heroProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  const handleOrderNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <section className="relative h-screen bg-gradient-to-r from-purple-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  if (heroProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Slider */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          {heroProducts.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} flex items-center`}
              >
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                  {/* Content */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-white space-y-6"
                  >
                    <div className="space-y-2">
                      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-3xl md:text-5xl font-semibold">
                        {slide.subtitle}
                      </h2>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                        {slide.discount} OFF
                      </span>
                      <span className="text-xl text-gray-300">
                        {slide.description}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => handleOrderNow(slide.productId)}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>ORDER NOW</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart(slide.productId)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(slide.productId)}
                        className="bg-white/20 hover:bg-white/30 text-white px-6 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex justify-center lg:justify-end"
                  >
                    <div className="relative">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full max-w-md h-auto object-cover rounded-lg shadow-2xl"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/600/400';
                        }}
                      />
                      <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                        {slide.discount}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        {heroProducts.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {heroProducts.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center text-white"
              >
                <div className="text-2xl md:text-3xl font-bold text-red-400">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

