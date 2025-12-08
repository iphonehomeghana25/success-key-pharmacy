import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import '../../styles/admin/BlogManagement.css';
import { FileText, Plus, Edit, Trash2, Search, X, UploadCloud, Loader, User, Calendar } from 'lucide-react';

export default function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Success Key Team',
    category: 'General Health',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  // --- 1. FETCH BLOG POSTS ---
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching blogs:', error);
    else setPosts(data || []);
    setLoading(false);
  };

  // --- 2. HANDLE INPUTS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- 3. SUBMIT (ADD/EDIT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = editingPost ? editingPost.image_url : '';

      // Upload Image if new one selected
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `blog-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        image_url: imageUrl
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchPosts();
      resetForm();

    } catch (error) {
      console.error('Error saving post:', error.message);
      alert('Error saving post. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 4. DELETE ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete post.');
    }
  };

  // --- HELPERS ---
  const openAddModal = () => {
    setEditingPost(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'Success Key Team',
      category: post.category || 'General Health',
      image: null
    });
    setPreviewUrl(post.image_url);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '', excerpt: '', content: '', 
      author: 'Success Key Team', category: 'General Health', image: null
    });
    setPreviewUrl('');
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-mgmt-container">
      
      {/* Header Actions */}
      <div className="bm-header">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={18} /> New Article
        </button>
      </div>

      {/* Blog List */}
      <div className="bm-list">
        {loading ? (
          <div className="loading-state">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <p>No articles found.</p>
          </div>
        ) : (
          <div className="bm-grid">
            {filteredPosts.map(post => (
              <div key={post.id} className="bm-card">
                <div className="bm-image">
                  {post.image_url ? <img src={post.image_url} alt={post.title} /> : <div className="no-img">No Img</div>}
                  <span className="bm-category">{post.category}</span>
                </div>
                <div className="bm-content">
                  <h4>{post.title}</h4>
                  <div className="bm-meta">
                    <span><User size={12}/> {post.author}</span>
                    <span><Calendar size={12}/> {new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="bm-actions">
                    <button className="btn-icon edit" onClick={() => openEditModal(post)}><Edit size={16}/></button>
                    <button className="btn-icon delete" onClick={() => handleDelete(post.id)}><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3>{editingPost ? 'Edit Article' : 'Write New Article'}</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              
              {/* Image Upload */}
              <div className="form-group image-upload-group">
                <div className="image-preview-box wide-preview">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <UploadCloud size={32} />
                      <span>Cover Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                </div>
              </div>

              <div className="form-group">
                <label>Article Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="e.g., 5 Ways to Prevent Malaria"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option>General Health</option>
                    <option>Prevention</option>
                    <option>Nutrition</option>
                    <option>Chronic Care</option>
                    <option>Safety</option>
                    <option>Pharmacy News</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input 
                    type="text" 
                    name="author" 
                    value={formData.author} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Short Excerpt (Summary)</label>
                <textarea 
                  name="excerpt" 
                  rows="2" 
                  value={formData.excerpt} 
                  onChange={handleInputChange}
                  placeholder="A brief summary that appears on the card..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Full Content</label>
                <textarea 
                  name="content" 
                  rows="8" 
                  value={formData.content} 
                  onChange={handleInputChange}
                  placeholder="Write your full article here..."
                  className="content-editor"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader className="spin" size={18}/> Publishing...</> : 'Publish Article'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
