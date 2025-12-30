import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../config/api';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (token) {
      fetchAdmin();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchAdmin = async () => {
    try {
      const token = Cookies.get('admin_token');
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Normalize admin object to always include `id` field
        const a = data.admin || {};
        const normalized = { ...a, id: a.id || a._id };
        setAdmin(normalized);
      } else {
        Cookies.remove('admin_token');
        setAdmin(null);
      }
    } catch (error) {
      console.error('Error fetching admin:', error);
      Cookies.remove('admin_token');
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }

      Cookies.set('admin_token', data.token, {
        expires: 7,
        sameSite: 'lax',
        path: '/'
      });

      setAdmin(data.admin);
      return { success: true, admin: data.admin };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Unable to connect to server'
      };
    }
  };

  const logout = () => {
    setAdmin(null);
    Cookies.remove('admin_token');
    window.location.href = '/admin/login';
  };

  const getAuthHeaders = () => {
    const token = Cookies.get('admin_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const updateAdmin = async (updates) => {
    try {
      const token = Cookies.get('admin_token');
      if (!token || !admin) return { success: false, error: 'Not authenticated' };

      const adminId = admin.id || admin._id;
      const response = await fetch(`${API_BASE_URL}/api/admin/${adminId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        return { success: false, error: data.error || 'Update failed' };
      }

      // Merge updated fields into local admin state and normalize id
      const a = data.admin || {};
      const updated = { ...admin, ...a, id: a.id || a._id || admin.id || admin._id };
      setAdmin(updated);
      return { success: true, admin: updated };
    } catch (error) {
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();
      if (!response.ok || !data.success) return { success: false, error: data.error || 'Failed to change password' };
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to change password' };
    }
  };

  const value = {
    admin,
    isLoading,
    login,
    logout,
    isAuthenticated: !!admin,
    getAuthHeaders,
    updateAdmin,
    changePassword,
    fetchAdmin
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

