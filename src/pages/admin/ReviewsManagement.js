import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Star, Trash2, Plus, User, MapPin, Quote } from 'lucide-react';
import '../../styles/admin/ReviewsManagement.css'; // We'll create this style file next

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    text: ''
  });

  // --- 1. Fetch Reviews ---
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching reviews:', error);
    else setReviews(data || []);
    setLoading(false);
  };

  // --- 2. Add Review ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([formData]);

      if (error) throw error;

      fetchReviews();
      setIsModalOpen(false);
      setFormData({ name: '', location: '', rating: 5, text: '' }); // Reset form
    } catch (error) {
      alert('Error adding review: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 3. Delete Review ---
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReviews(reviews.filter(r => r.id !== id));
    } catch (error) {
      alert('Error deleting review.');
    }
  };

  return (
    <div className="reviews-mgmt-container">
      
      <div className="rm-header">
        <div>
          <h2>Customer Reviews</h2>
          <p style={{ color: '#64748b' }}>Manage testimonials displayed on the homepage.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="rm-grid">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="empty-state">No reviews yet. Add one!</div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="rm-card">
              <div className="rm-card-header">
                <div className="rm-user">
                  <span className="rm-avatar"><User size={16} /></span>
                  <div>
                    <h4>{review.name}</h4>
                    <span className="rm-location"><MapPin size={12} /> {review.location}</span>
                  </div>
                </div>
                <button className="btn-icon delete" onClick={() => handleDelete(review.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="rm-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#eab308" stroke="none" />
                ))}
              </div>
              
              <div className="rm-text">
                <Quote size={16} className="quote-icon-small" />
                <p>"{review.text}"</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- ADD MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Testimonial</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                  placeholder="e.g. Ama Serwaa"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Lapaz"
                  />
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <select 
                    value={formData.rating}
                    onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Review Text</label>
                <textarea 
                  rows="4" 
                  value={formData.text}
                  onChange={e => setFormData({...formData, text: e.target.value})}
                  required
                  placeholder="What did they say?"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
