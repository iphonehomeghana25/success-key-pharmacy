import React from 'react';
import '../styles/Testimonials.css';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Mrs. Mensah",
    location: "Abeka",
    text: "Success Key is a lifesaver. I uploaded my prescription on WhatsApp and they delivered it within 30 minutes. Very professional staff!",
    stars: 5,
  },
  {
    id: 2,
    name: "Kweku Boateng",
    location: "Lapaz",
    text: "I love their mini mart section. I can buy my vitamins and pick up diapers for the baby at the same time. Good prices too.",
    stars: 5,
  },
  {
    id: 3,
    name: "Sarah Osei",
    location: "Tesano",
    text: "The pharmacist took time to explain how to take my medication properly. You don't get that kind of attention everywhere.",
    stars: 5,
  },
];

const Testimonials = () => {
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
                  {[...Array(review.stars)].map((_, i) => (
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
