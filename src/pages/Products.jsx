import React, { useState, useMemo, useEffect, useRef, startTransition } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useProducts } from '../context/ProductContext';
import { API_BASE_URL } from '../config/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isSyncingFromUrl = useRef(false);
  const prevSearchRef = useRef(location.search);
  const { categories, loading: categoriesLoading, error: categoriesError } = useProducts();
  
  // Helper function to validate ObjectId
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // Helper function to get category ID from slug or ID
  const resolveCategoryId = (categoryParam) => {
    if (!categoryParam || categoryParam === 'all') return 'all';
    
    // If it's already a valid ObjectId, use it
    if (isValidObjectId(categoryParam)) return categoryParam;
    
    // Try to find category by slug
    const category = categories.find(cat => cat.slug === categoryParam);
    return category ? category._id : 'all';
  };
  
  // Local state for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Initialize from URL params
  const categoryFromUrl = searchParams.get('category') || 'all';
  const searchFromUrl = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(() => resolveCategoryId(categoryFromUrl));
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const maxProductPrice = useMemo(() => {
    if (products.length === 0) {
      return 10000;
    }
    return products.reduce((max, product) => {
      const price = product.discountPrice || product.price || 0;
      return price > max ? price : max;
    }, 0);
  }, [products]);

  const sliderMax = useMemo(() => {
    const rounded = Math.ceil((maxProductPrice || 1000) / 500) * 500;
    return Math.max(1000, rounded);
  }, [maxProductPrice]);

  // Fetch products with pagination
  const fetchProducts = async (page = 1, category = 'all', search = '', sort = 'default') => {
    setLoading(true);
    setError(null);
    try {
      // Resolve category to valid ObjectId or 'all'
      const resolvedCategory = resolveCategoryId(category);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12', // Optimized limit
        ...(resolvedCategory !== 'all' && { category: resolvedCategory }),
        ...(search && { search }),
        ...(sort !== 'default' && { sort }),
      });
      
      const response = await fetch(`${API_BASE_URL}/api/products?${params}`);
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to load products');
      }
      
      // Normalize products (reuse logic from context)
      const normalizedProducts = (data.products || []).map(product => {
        const primaryImage = product.image || (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '');
        const imageList = Array.isArray(product.images) ? product.images : [];
        const normalizedImages = imageList.map(imgPath => {
          if (!imgPath) return 'https://placehold.co/600x600?text=Product';
          if (imgPath.startsWith('/src/') || imgPath.startsWith('/public/')) return imgPath;
          if (/^https?:\/\//i.test(imgPath) || imgPath.startsWith('data:')) return imgPath;
          const base = API_BASE_URL.replace(/\/$/, '');
          const normalizedPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
          if (base.endsWith('/backend') && normalizedPath.startsWith('/backend/')) {
            return `${base}${normalizedPath.replace('/backend', '')}`;
          }
          return `${base}${normalizedPath}`;
        }).filter(Boolean);
        const fallbackImage = normalizedImages.length > 0 ? normalizedImages[0] : 'https://placehold.co/600x600?text=Product';
        
        return {
          id: product._id || product.id || '',
          slug: product.slug || '',
          name: product.name || '',
          category: product.category_id?.slug || product.category || '',
          categoryName: product.category_id?.name || '',
          category_id: product.category_id?._id || product.category_id || '',
          description: product.description || '',
          price: Number(product.price) || 0,
          discountPrice: product.discount_price !== undefined ? Number(product.discount_price) : null,
          discount: product.discount !== undefined ? Number(product.discount) : null,
          rating: Number(product.rating) || 0,
          reviews: Number(product.reviews_count || product.reviews) || 0,
          inStock: Boolean(product.in_stock ?? product.inStock ?? true),
          stockQuantity: Number(product.stock_quantity ?? product.stockQuantity) || 0,
          badge: product.badge || '',
          isActive: Boolean(product.is_active ?? product.isActive ?? true),
          isHighlighted: Boolean(product.is_highlighted ?? product.isHighlighted ?? false),
          features: Array.isArray(product.features) ? product.features : [],
          images: normalizedImages,
          image: fallbackImage,
        };
      });
      
      setProducts(normalizedProducts);
      setTotalPages(data.pagination?.pages || 1);
      setTotalProducts(data.pagination?.total || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPriceRange((prev) => {
      const [min, currentMax] = prev;
      if (currentMax === sliderMax) {
        return prev;
      }
      if (min === 0) {
        return [0, sliderMax];
      }
      if (currentMax > sliderMax) {
        return [min, sliderMax];
      }
      return prev;
    });
  }, [sliderMax]);

  // Fetch products when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Request timed out. Please try again.');
    }, 8000); // 8 second timeout

    fetchProducts(1, selectedCategory, searchQuery, sortBy);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery, sortBy]);

  // Sync state with URL when URL changes (e.g., when clicking category in header)
  useEffect(() => {
    // Only sync if URL actually changed
    if (location.search !== prevSearchRef.current) {
      prevSearchRef.current = location.search;
      
      const urlCategory = searchParams.get('category') || 'all';
      const urlSearch = searchParams.get('search') || '';
      
      // Only update if values actually changed to prevent unnecessary re-renders
      if (resolveCategoryId(urlCategory) !== selectedCategory || urlSearch !== searchQuery) {
        // Mark that we're syncing from URL to prevent circular updates
        isSyncingFromUrl.current = true;
        
        // Use startTransition to mark this as non-urgent update to prevent flickering
        startTransition(() => {
          setSelectedCategory(resolveCategoryId(urlCategory));
          setSearchQuery(urlSearch);
        });
        
        // Reset flag after state updates complete
        setTimeout(() => {
          isSyncingFromUrl.current = false;
        }, 0);
      }
    }
  }, [location.search, searchParams, selectedCategory, searchQuery]);

  // Update URL when category or search changes from user interaction in this component
  useEffect(() => {
    // Skip if we're currently syncing from URL
    if (isSyncingFromUrl.current) {
      return;
    }
    
    const currentCategory = searchParams.get('category') || 'all';
    const currentSearch = searchParams.get('search') || '';
    
    // Only update URL if state differs from current URL
    if (selectedCategory !== currentCategory || searchQuery !== currentSearch) {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') {
        params.set('category', selectedCategory);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }
      setSearchParams(params, { replace: true });
    }
  }, [selectedCategory, searchQuery, setSearchParams, searchParams]);

  // Re-resolve category when categories are loaded
  useEffect(() => {
    if (!categoriesLoading && categories.length > 0) {
      const urlCategory = searchParams.get('category') || 'all';
      if (urlCategory !== 'all' && selectedCategory === 'all') {
        const resolved = resolveCategoryId(urlCategory);
        if (resolved !== 'all') {
          setSelectedCategory(resolved);
        }
      }
    }
  }, [categories, categoriesLoading, searchParams, selectedCategory]);

  // Filter products (only price range since sorting is done server-side)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productPrice = product.discountPrice || product.price;
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
      
      return matchesPrice;
    });
  }, [products, priceRange]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const nextValue = Number.isFinite(value) ? Math.min(value, sliderMax) : sliderMax;
    setPriceRange([0, nextValue]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, selectedCategory, searchQuery, sortBy);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              All Products
            </h1>
            <p className="text-lg text-gray-600">
              Discover our complete collection of authentic Bengali products
            </p>
            {error && (
              <p className="text-sm text-red-500 mt-2">
                {error}. Showing available products.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  ×
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-emerald-100 text-emerald-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All Products ({products.length})
                  </button>
                  {categories.map((category) => {
                    const categoryId = category._id;
                    const count = products.filter(p => p.category_id === categoryId || p.category === categoryId).length;
                    const hasProducts = count > 0;
                    return (
                      <button
                        key={categoryId}
                        onClick={() => handleCategoryChange(categoryId)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === categoryId
                            ? 'bg-emerald-100 text-emerald-800 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.image ? (
                          <img src={category.image} alt={category.name} className="inline-block w-8 h-8 rounded-full object-cover mr-3" />
                        ) : (
                          <span className="mr-2">{category.icon}</span>
                        )}
                        <span className="mr-2">{category.name}</span>
                        <span className="text-gray-500">({count})</span>
                        {!hasProducts && (
                          <span className="ml-2 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">No products yet</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range: ৳0 - ৳{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max={sliderMax}
                  step="100"
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>৳0</span>
                  <span>৳{sliderMax.toLocaleString()}+</span>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {totalProducts} products
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>

                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                key={`products-${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse our categories
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 10000]);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

