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
            // Get the image path from product
            let productImage =
              product.images && product.images.length > 0
                ? product.images[0]
                : product.image || '';

            // Construct full image URL if it's a relative path
            if (productImage) {
              if (productImage.startsWith('http://') || productImage.startsWith('https://')) {
                // Already a full URL
              } else if (productImage.startsWith('/')) {
                // Relative path starting with /
                productImage = `${API_BASE_URL}${productImage}`;
              } else {
                // Relative path without /
                productImage = `${API_BASE_URL}/${productImage}`;
              }
            }

            const categorySlug = product.category_id?.slug || product.category || 'shari';

            return {
              id: product._id || product.id,
              title: (product.name || 'Special Product').toUpperCase().split(' ').slice(0, 2).join(' ') || 'SPECIAL',
              subtitle: (product.name || 'Special Product').toUpperCase().split(' ').slice(2).join(' ') || 'PRODUCT',
              description: product.discount ? `${product.discount}% OFF` : 'DISCOUNT',
              ctaText: 'ORDER NOW',
              image: productImage || '/api/placeholder/600/400',
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
    <section className="relative h-screen overflow-hidden" style={{ minHeight: '100vh', height: '100vh' }}>
      {/* Hero Slider */}
      <div className="relative h-full w-full" style={{ height: '100%', position: 'relative' }}>
        <AnimatePresence initial={false}>
          {heroProducts.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} flex items-center`}
                style={{ 
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center h-full py-8 sm:py-12">
                  {/* Content */}
                  <div className="text-white space-y-3 sm:space-y-4 md:space-y-6 text-center lg:text-left">
                    <div className="space-y-1 sm:space-y-2">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
                        {slide.subtitle}
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                      <span className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base md:text-lg">
                        {slide.discount} OFF
                      </span>
                      <span className="text-base sm:text-lg md:text-xl text-gray-300">
                        {slide.description}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                      <button
                        onClick={() => handleOrderNow(slide.productId)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-colors flex items-center justify-center space-x-1.5 sm:space-x-2 w-full sm:w-auto"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>ORDER NOW</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart(slide.productId)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-colors w-full sm:w-auto"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(slide.productId)}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-colors flex items-center justify-center w-full sm:w-auto"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center lg:justify-end order-first lg:order-last">
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto rounded-lg shadow-2xl"
                        style={{ 
                          display: 'block',
                          maxHeight: '300px',
                          objectFit: 'contain',
                          width: '100%',
                          height: 'auto'
                        }}
                        onError={(e) => {
                          e.target.src = '/api/placeholder/600/400';
                        }}
                      />
                      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 bg-red-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full font-bold text-xs sm:text-sm">
                        {slide.discount}
                      </div>
                    </div>
                  </div>
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
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {heroProducts.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
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
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white"
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-400">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

