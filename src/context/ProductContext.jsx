import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { products as staticProducts, categories as staticCategories } from '../data/products';

const ProductContext = createContext(null);

const normalizeNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const buildImageUrl = (path) => {
  if (!path) {
    return 'https://placehold.co/600x600?text=Product';
  }

  if (path.startsWith('/src/') || path.startsWith('/public/')) {
    return path;
  }

  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Avoid duplicated `/backend/backend` path when API base already ends with /backend
  if (base.endsWith('/backend') && normalizedPath.startsWith('/backend/')) {
    return `${base}${normalizedPath.replace('/backend', '')}`;
  }

  return `${base}${normalizedPath}`;
};

const normalizeProduct = (product) => {
  if (!product) {
    return null;
  }

  const primaryImage = product.image || (Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '');
  const imageList = Array.isArray(product.images) ? product.images : [];

  const normalizedImages = imageList
    .map((imgPath) => buildImageUrl(imgPath))
    .filter(Boolean);

  const fallbackImage = buildImageUrl(primaryImage);

  if (normalizedImages.length === 0) {
    normalizedImages.push(fallbackImage);
  }

  // Handle MongoDB _id field
  const productId = product._id || product.id;
  const categorySlug = product.category_id?.slug || product.category || product.category_slug || '';
  const categoryName = product.category_id?.name || product.category_name || '';

  return {
    id: productId ? (typeof productId === 'string' ? productId : String(productId)) : '',
    slug: product.slug || '',
    name: product.name || '',
    category: categorySlug,
    categoryName: categoryName,
    description: product.description || '',
    price: normalizeNumber(product.price),
    discountPrice: product.discount_price !== undefined && product.discount_price !== null
      ? normalizeNumber(product.discount_price)
      : null,
    discount: product.discount !== undefined && product.discount !== null
      ? normalizeNumber(product.discount, 0)
      : null,
    rating: normalizeNumber(product.rating, 0),
    reviews: normalizeNumber(product.reviews_count || product.reviews, 0),
    inStock: product.in_stock !== undefined ? Boolean(product.in_stock) : Boolean(product.inStock ?? true),
    stockQuantity: product.stock_quantity !== undefined
      ? normalizeNumber(product.stock_quantity, 0)
      : normalizeNumber(product.stockQuantity ?? 0, 0),
    badge: product.badge || '',
    isActive: product.is_active !== undefined ? Boolean(product.is_active) : Boolean(product.isActive ?? true),
    features: Array.isArray(product.features) ? product.features : [],
    images: normalizedImages,
    image: fallbackImage,
  };
};

const normalizeCategory = (category) => {
  const categoryId = category._id || category.id || '';
  return {
    id: category.slug || (categoryId ? String(categoryId) : ''),
    name: category.name || '',
    slug: category.slug || (categoryId ? String(categoryId) : ''),
    icon: category.icon || '',
    image: category.image ? buildImageUrl(category.image) : '',
    description: category.description || '',
    color: category.color || '',
  };
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyProducts = (items) => {
    const normalized = items
      .map((item) => normalizeProduct(item))
      .filter((item) => item && item.id && item.id !== '');
    setProducts(normalized);
  };

  const applyCategories = (items) => {
    const normalized = items
      .map((item) => normalizeCategory(item))
      .filter((item) => item.id);
    setCategories(normalized);
  };

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to load products');
    }

    return data.products || [];
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to load categories');
    }

    return data.categories || [];
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [categoryData, productData] = await Promise.all([
        fetchCategories(),
        fetchProducts(),
      ]);

      // Normalize products and categories locally so we can filter categories
      const normalizedProducts = (Array.isArray(productData) ? productData : [])
        .map((p) => normalizeProduct(p))
        .filter((p) => p && p.id && p.id !== '');

      const normalizedCategories = (Array.isArray(categoryData) ? categoryData : [])
        .map((c) => normalizeCategory(c))
        .filter((c) => c && c.id);

      // Show all categories regardless of whether they have products
      setProducts(normalizedProducts);
      setCategories(normalizedCategories);
    } catch (err) {
      console.error('Failed to load products from API:', err);
      setError(err.message || 'Failed to load products from API');
      // On error, do not fallback to static DB data to ensure only DB-driven content shows.
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const value = useMemo(() => ({
    products,
    categories,
    loading,
    error,
    refreshProducts: loadData,
  }), [products, categories, loading, error]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};


