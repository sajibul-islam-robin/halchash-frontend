import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import HeroSection from '../components/hero/HeroSection';
import ProductCard from '../components/product/ProductCard';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const navigate = useNavigate();
  const { products, categories, loading, error } = useProducts();

  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);
  const shariProducts = useMemo(
    () => products.filter((p) => p.category === 'shari').slice(0, 3),
    [products],
  );
  const sweetProducts = useMemo(
    () => products.filter((p) => p.category === 'sweets').slice(0, 3),
    [products],
  );
  const homeProducts = useMemo(
    () => products.filter((p) => p.category === 'bedsheets').slice(0, 3),
    [products],
  );
  
  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  // Helper function to get category ID by slug
  const getCategoryIdBySlug = (slug) => {
    const category = categories.find(cat => cat.slug === slug);
    return category ? category._id : slug;
  };

  // Build a quick lookup of categories that have products
  const productCategorySet = useMemo(() => new Set(products.map(p => p.category).filter(Boolean)), [products]);

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 px-4">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover authentic Bengali products across our carefully curated categories
            </p>
            {error && (
              <p className="text-sm text-red-500 mt-2">
                {error}. Showing available products.
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {categories.map((category, index) => {
              // Define gradient backgrounds for each category
              const categoryGradients = {
                'shari': 'bg-gradient-to-br from-purple-50 via-purple-100/50 to-pink-50',
                'sweets': 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
                'bedsheets': 'bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50',
                'traditional': 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
                'beauty': 'bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50'
              };
              
              const gradientClass = categoryGradients[category.slug || category.id] || 'bg-gradient-to-br from-gray-50 to-gray-100';
              
              return (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleCategoryClick(category._id)}
                  className={`${gradientClass} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group border border-white/50 hover:border-white/80 relative overflow-hidden`}
                >
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover" />
                      ) : (
                        <div className="text-2xl sm:text-3xl md:text-4xl">{category.icon}</div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors text-sm sm:text-base">{category.name}</h3>
                    { (productCategorySet.has(category.slug) || productCategorySet.has(category.id)) ? (
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${category.color} shadow-sm group-hover:shadow-md transition-all`}>
                        View Products
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 shadow-sm">
                        No products yet
                      </span>
                    ) }
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-xl"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Arrival Products Carousel */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 px-4">
              New Arrival Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Check out our latest additions to the collection
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Selling Products Carousel */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 px-4">
              Top Selling Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Most popular products among our customers
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

          {/* Category Showcases */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 md:space-y-16">
          {/* Shari Collection */}
          {shariProducts.length > 0 && (
            <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Traditional Shari Collection
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">Handwoven elegance from Bengal</p>
              </div>
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => handleCategoryClick(getCategoryIdBySlug('shari'))}
              >
                View All Shari
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shariProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            </div>
          )}

          {/* Sweet Collection */}
          {sweetProducts.length > 0 && (
            <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4"
            >
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  Traditional Bengali Sweets
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">Fresh and authentic taste of Bengal</p>
              </div>
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => handleCategoryClick(getCategoryIdBySlug('sweets'))}
              >
                View All Sweets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {sweetProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            </div>
          )}

          {/* Home Collection */}
          {homeProducts.length > 0 && (
            <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4"
            >
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  Home & Bed Sheets
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">Comfort and style for your home</p>
              </div>
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => handleCategoryClick(getCategoryIdBySlug('bedsheets'))}
              >
                View All Home Items
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {homeProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

