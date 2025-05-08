import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Download, Filter, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  description: string;
  status?: 'active' | 'inactive';
  featured?: boolean;
  specs?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
  sku?: string;
  brand?: string;
  lastUpdated?: Date;
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [stockFilter, setStockFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: '',
    description: '',
    sku: '',
    brand: '',
    status: 'active' as const,
    featured: false,
    specs: [] as string[],
    features: [] as string[],
    rating: 4.5,
    reviews: 0
  });

  const [specInput, setSpecInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const handleAddSpec = () => {
    if (specInput.trim()) {
      setNewProduct(prev => ({
        ...prev,
        specs: [...(prev.specs || []), specInput.trim()]
      }));
      setSpecInput('');
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setNewProduct(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveSpec = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      specs: prev.specs?.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const handleAddProduct = async () => {
    try {
      setIsLoading(true);

      if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.imageUrl || !newProduct.stock) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate image URL
      if (!newProduct.imageUrl.startsWith('http')) {
        toast.error('Please provide a valid image URL');
        return;
      }

      const productToSave = {
        ...newProduct,
        specs: newProduct.specs?.length ? newProduct.specs : getDefaultSpecs(newProduct.category),
        features: newProduct.features?.length ? newProduct.features : getDefaultFeatures(newProduct.category)
      };

      const response = await api.post('/products', productToSave);
      
      if (response.data) {
        setProducts(prev => [...prev, response.data]);
        toast.success('Product added successfully');
        setShowAddModal(false);
        resetNewProduct();
      }
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: '',
      description: '',
      sku: '',
      brand: '',
      status: 'active',
      featured: false,
      specs: [],
      features: [],
      rating: 4.5,
      reviews: 0
    });
  };

  const getDefaultSpecs = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cameras':
        return [
          'Full-Frame CMOS Sensor',
          'Advanced AF System',
          'Dual Card Slots',
          'Weather-Sealed Construction'
        ];
      case 'lenses':
        return [
          'Advanced Optical Design',
          'Weather-Sealed Construction',
          'Fast Autofocus System',
          'Premium Build Quality'
        ];
      case 'accessories':
        return [
          'Professional Grade Materials',
          'Durable Construction',
          'Universal Compatibility',
          'Ergonomic Design'
        ];
      case 'batteries':
        return [
          'High Capacity',
          'Long Battery Life',
          'Fast Charging Support',
          'Overcharge Protection'
        ];
      default:
        return [];
    }
  };

  const getDefaultFeatures = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cameras':
        return [
          'Advanced Autofocus',
          'High-Speed Shooting',
          'Professional Build Quality',
          'Enhanced Stabilization'
        ];
      case 'lenses':
        return [
          'Superior Edge Sharpness',
          'Beautiful Bokeh',
          'Fast Aperture',
          'Image Stabilization'
        ];
      case 'accessories':
        return [
          'Quick Release System',
          'Adjustable Design',
          'Premium Materials',
          'Professional Grade'
        ];
      case 'batteries':
        return [
          'Smart Power Management',
          'Temperature Control',
          'Safety Protection',
          'LED Indicators'
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      try {
        await Promise.all(selectedProducts.map(id => api.delete(`/products/${id}`)));
        setProducts(products.filter(product => !selectedProducts.includes(product._id)));
        setSelectedProducts([]);
        toast.success('Products deleted successfully');
      } catch (error) {
        console.error('Error deleting products:', error);
        toast.error('Failed to delete products');
      }
    }
  };

  const handleExport = () => {
    const csv = products.map(product => 
      Object.values(product).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      
      const matchesStock = stockFilter === 'all' ||
        (stockFilter === 'inStock' && product.stock > 0) ||
        (stockFilter === 'lowStock' && product.stock <= 5) ||
        (stockFilter === 'outOfStock' && product.stock === 0);

      const matchesPrice = (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max));

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    })
    .sort((a, b) => {
      const compareValue = (val1: any, val2: any) => {
        if (typeof val1 === 'string') {
          return val1.localeCompare(val2);
        }
        return val1 - val2;
      };

      const comparison = compareValue(a[sortBy as keyof Product], b[sortBy as keyof Product]);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const categories = ['Cameras', 'Lenses', 'Accessories', 'Batteries'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              {filteredProducts.length} products • Last updated {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-5 w-5 mr-2 text-gray-500" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex-1 w-full sm:w-auto sm:mr-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  Filters
                </button>
                
                {selectedProducts.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete Selected ({selectedProducts.length})
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock Status</label>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="all">All</option>
                    <option value="inStock">In Stock</option>
                    <option value="lowStock">Low Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Range</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sort By</label>
                  <div className="mt-1 flex space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="stock">Stock</option>
                      <option value="category">Category</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(products.map(p => p._id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product._id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product._id));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status === 'active' ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-1" />
                        )}
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="relative">
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specifications</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Add specification"
                  />
                  <button
                    onClick={handleAddSpec}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {newProduct.specs?.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{spec}</span>
                      <button
                        onClick={() => handleRemoveSpec(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Add feature"
                  />
                  <button
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {newProduct.features?.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{feature}</span>
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">SKU</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Featured Product
                </label>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}