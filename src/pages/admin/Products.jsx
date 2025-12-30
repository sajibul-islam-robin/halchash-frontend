import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { API_BASE_URL } from '../../config/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Products = () => {
  const { getAuthHeaders } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock_quantity: '',
    discount: '',
    badge: '',
    images: [],
    imagePreviews: [],
    is_hero: false,
    hero_order: '',
    is_active: true
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      const url = `${API_BASE_URL}/api/products/admin/all?search=${searchTerm}`;
      const response = await fetch(url, { headers: getAuthHeaders() });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate category_id is selected
    if (!formData.category_id) {
      toast.error('Please select a category');
      return;
    }
    
    try {
      const url = editingProduct
        ? `${API_BASE_URL}/api/products/${editingProduct._id}`
        : `${API_BASE_URL}/api/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock_quantity', formData.stock_quantity);
      formDataToSend.append('discount', formData.discount);
      formDataToSend.append('badge', formData.badge);
      formDataToSend.append('is_active', formData.is_active);
      
      // Append image files
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          if (file instanceof File) {
            formDataToSend.append('images', file);
          }
        });
      }
      
      // Handle hero flag/order: for edits we always send hero_order (empty string => remove)
      if (editingProduct) {
        formDataToSend.append('hero_order', formData.is_hero ? (formData.hero_order || 1) : '');
      } else {
        if (formData.is_hero) formDataToSend.append('hero_order', formData.hero_order || 1);
      }

      const headers = getAuthHeaders();
      delete headers['Content-Type']; // Let the browser set it for FormData
      
      const response = await fetch(url, {
        method,
        headers,
        body: formDataToSend
      });

      const data = await response.json();
      if (data.success) {
        toast.success(editingProduct ? 'Product updated' : 'Product created');
        setDialogOpen(false);
        resetForm();
        fetchProducts();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('An error occurred: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      description: '',
      price: '',
      stock_quantity: '',
      discount: '',
      badge: '',
      images: [],
      imagePreviews: [],
      is_hero: false,
      hero_order: '',
      is_active: true
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id?._id || '',
      description: product.description || '',
      price: product.price,
      stock_quantity: product.stock_quantity,
      discount: product.discount || '',
      badge: product.badge || '',
      images: [],
      imagePreviews: product.images ? product.images.map(img => `${API_BASE_URL}${img}`) : [],
      is_active: product.is_active,
      is_hero: product.hero_order ? true : false,
      hero_order: product.hero_order || ''
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product information' : 'Fill in the details to create a new product'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                <Input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <Input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Images (Max 4 images)</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const totalImages = formData.images.length + files.length;
                      
                      if (totalImages > 4) {
                        toast.error('Maximum 4 images allowed per product');
                        return;
                      }
                      
                      const newImages = [...formData.images, ...files];
                      const newPreviews = [
                        ...formData.imagePreviews,
                        ...files.map(f => URL.createObjectURL(f))
                      ];
                      setFormData({
                        ...formData,
                        images: newImages,
                        imagePreviews: newPreviews
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500">
                    {formData.imagePreviews.length}/4 images added
                  </p>
                  {formData.imagePreviews && formData.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {formData.imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${idx}`}
                            className="w-full aspect-square object-cover rounded border-2 border-gray-200"
                          />
                          <div className="absolute top-1 left-1 bg-gray-800/75 text-white text-xs px-2 py-1 rounded">
                            {idx + 1}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = formData.imagePreviews.filter((_, i) => i !== idx);
                              const newImages = formData.images.filter((_, i) => i !== idx);
                              setFormData({
                                ...formData,
                                images: newImages,
                                imagePreviews: newPreviews
                              });
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_hero"
                    checked={formData.is_hero}
                    onChange={(e) => setFormData({ ...formData, is_hero: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="is_hero">Feature on Hero</label>
                </div>

                {formData.is_hero && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Hero Order</label>
                    <Input
                      type="number"
                      min={1}
                      value={formData.hero_order}
                      onChange={(e) => setFormData({ ...formData, hero_order: e.target.value })}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="is_active">Active</label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {product.image ? (
                      <img src={`${API_BASE_URL}${product.image}`} alt={product.name} className="w-20 h-20 object-cover rounded" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>৳{product.price}</TableCell>
                  <TableCell>{product.stock_quantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;

