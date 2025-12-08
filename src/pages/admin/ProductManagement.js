import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import '../../styles/admin/ProductManagement.css'; // We'll create this next
import { Package, Plus, Edit, Trash2, Search, X, UploadCloud, Loader } from 'lucide-react';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = Add Mode, object = Edit Mode

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pharmacy', // Default
    price: '',
    description: '',
    image: null // File object
  });
  const [previewUrl, setPreviewUrl] = useState(''); // For showing image preview

  // --- 1. FETCH PRODUCTS ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching products:', error);
    else setProducts(data || []);
    setLoading(false);
  };

  // --- 2. HANDLE FORM INPUT ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file)); // Create local preview
    }
  };

  // --- 3. SUBMIT (ADD OR EDIT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = editingProduct ? editingProduct.image_url : '';

      // A. Upload Image (if a new one was selected)
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // B. Insert or Update Database
      const productData = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        description: formData.description,
        image_url: imageUrl
      };

      if (editingProduct) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
      }

      // C. Reset & Refetch
      setIsModalOpen(false);
      fetchProducts();
      resetForm();

    } catch (error) {
      console.error('Error saving product:', error.message);
      alert('Error saving product. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 4. DELETE PRODUCT ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state instantly
      setProducts(products.filter(p => p.id !== id));

    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  // --- HELPERS ---
  const openAddModal = () => {
    setEditingProduct(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || '',
      image: null
    });
    setPreviewUrl(product.image_url);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', category: 'Pharmacy', price: '', description: '', image: null });
    setPreviewUrl('');
  };

  // --- FILTERING ---
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pm-container">
      
      {/* Header Actions */}
      <div className="pm-header">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product List Table */}
      <div className="pm-table-wrapper">
        {loading ? (
          <div className="loading-state">Loading inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <Package size={48} />
            <p>No products found.</p>
          </div>
        ) : (
          <table className="pm-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="img-thumbnail">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} />
                      ) : (
                        <div className="no-img">No Img</div>
                      )}
                    </div>
                  </td>
                  <td className="fw-bold">{product.name}</td>
                  <td><span className={`badge badge-${product.category.toLowerCase().replace(/\s/g, '-')}`}>{product.category}</span></td>
                  {/* Updated Price Column */}
                  <td>GH₵ {product.price}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon edit" onClick={() => openEditModal(product)} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(product.id)} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              
              {/* Image Upload */}
              <div className="form-group image-upload-group">
                <div className="image-preview-box">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <UploadCloud size={32} />
                      <span>Upload Image</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g., Paracetamol"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Mini Mart">Mini Mart</option>
                    <option value="Mom & Baby">Mom & Baby</option>
                    <option value="First Aid">First Aid</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Price (GHS)</label>
                <input 
                  type="text" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="e.g., 15.00"
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea 
                  name="description" 
                  rows="3" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Short details about the product..."
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader className="spin" size={18}/> Saving...</> : 'Save Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
