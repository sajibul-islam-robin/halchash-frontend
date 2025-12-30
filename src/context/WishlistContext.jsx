import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../config/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWishlist = async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);
      const token = Cookies.get('auth_token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        headers,
        credentials: 'include',
      });

      if (response.status === 401) {
        setWishlistItems([]);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWishlistItems(data.wishlist || []);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist when user is authenticated
  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlistItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToWishlist = async (productId) => {
    try {
      const token = Cookies.get('auth_token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.status === 401) {
        try {
          const errorData = await response.json();
          toast.error(errorData.error || 'Please login to add items to wishlist');
        } catch {
          toast.error('Please login to add items to wishlist');
        }
        return false;
      }

      const data = await response.json();

      if (data.success) {
        await loadWishlist();
        toast.success('Added to wishlist!');
        return true;
      } else {
        toast.error(data.error || 'Failed to add to wishlist');
        return false;
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = Cookies.get('auth_token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.status === 401) {
        try {
          const errorData = await response.json();
          toast.error(errorData.error || 'Please login to manage wishlist');
        } catch {
          toast.error('Please login to manage wishlist');
        }
        return false;
      }

      const data = await response.json();

      if (data.success) {
        await loadWishlist();
        toast.success('Removed from wishlist');
        return true;
      } else {
        toast.error(data.error || 'Failed to remove from wishlist');
        return false;
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
      return false;
    }
  };

  const toggleWishlist = async (productId) => {
    const exists = wishlistItems.some(
      (item) => String(item.product_id) === String(productId)
    );

    if (exists) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => String(item.product_id) === String(productId)
    );
  };

  const value = {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    loadWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

