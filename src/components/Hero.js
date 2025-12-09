import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook
import '../styles/Hero.css';
import { MessageCircle, MapPin, CheckCircle, Star } from 'lucide-react';

import shopFrontImg from '../assets/shop_front.jpg';
import interiorImg from '../assets/interior.jpg';
import tabletsImg from '../assets/tablets.jpg';

const Hero = () => {
  const navigate = useNavigate(); // Initialize hook

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = "Hello Success Key, I would like to make an inquiry.";
    window.open(`https://wa.me/233240000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* --- Left Column: Text Content --- */}
        <div className="hero-content">
          <div className="hero-badge">
            <CheckCircle size={16} className="icon-badge" /> 
            <span>Serving Abeka, Lapaz & Tesano</span>
          </div>
          
          <h1 className="hero-title">
            Genuine Medicines.<br />
            <span className="hero-highlight">Expert Advice.</span>
          </h1>
          
          <p className="hero-description">
            Visit <strong>Success Key Pharmacy</strong> for trusted healthcare. We are stocked with quality medications and our pharmacists are ready to listen.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle size={20} /> Talk to us now on WhatsApp
            </button>
            <button 
              className="btn-locate"
              onClick={() => navigate('/contact')} // Hook button to Contact Page
            >
              <MapPin size={20} /> Locate Shop
            </button>
          </div>
        </div>
        
        {/* --- Right Column: Triangle Image Layout --- */}
        <div className="hero-visuals">
          <div className="triangle-grid">
             
             {/* Top Left: Shop Front */}
             <div className="hero-card card-shop">
                <img src={shopFrontImg} alt="Success Key Shop Front" />
                <div className="card-label">Shop Front</div>
             </div>

             {/* Top Right: Interior */}
             <div className="hero-card card-interior">
                <img src={interiorImg} alt="Interior Shelves" />
                <div className="card-label label-dark">Well Stocked</div>
             </div>

             {/* Bottom Center: Tablets */}
             <div className="hero-card card-tablets">
                <img src={tabletsImg} alt="Quality Medicines" />
                 <div className="card-label">Quality Meds</div>
             </div>

             {/* Decorative Floating Star */}
             <div className="floating-star">
                <Star size={24} fill="currentColor" />
             </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
