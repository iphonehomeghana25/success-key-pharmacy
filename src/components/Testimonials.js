import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase
import '../styles/Testimonials.css';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from DB
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Only show top 3 on homepage

      if (!error && data) {
        setReviews(data);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  // Use DB reviews if available, otherwise hide section or show message
  if (!loading && reviews.length === 0) return null; // Hide if empty

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        <div className="testimonials-header">
          <span className="header-badge">Community Feedback</span>
          <h2>What Our Neighbors Say</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="quote-icon">
                <Quote size={24} />
              </div>
              
              <p className="review-text">"{review.text}"</p>
              
              <div className="review-footer">
                <div className="reviewer-info">
                  <h4>{review.name}</h4>
                  <span>{review.location}</span>
                </div>
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
