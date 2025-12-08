import React from 'react';
import '../styles/Hero.css'; // Correct path to styles folder
import { MessageCircle, MapPin, CheckCircle, Star } from 'lucide-react';

// Importing assets (Ensure these match your actual file names in the assets folder)
import shopFrontImg from '../assets/shop_front.jpg';
import interiorImg from '../assets/interior.jpg';
import tabletsImg from '../assets/tablets.jpg';

const Hero = () => {
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
            <button className="btn-whatsapp">
              <MessageCircle size={20} /> Chat on WhatsApp
            </button>
            <button className="btn-locate">
              <MapPin size={20} /> Locate Shop
            </button>
          </div>
        </div>
        
        {/* --- Right Column: Triangle Image Layout --- */}
        <div className="hero-visuals">
          <div className="triangle-grid">
             
             {/* Top Left: Shop Front (Large) */}
             <div className="hero-card card-shop">
                <img src={shopFrontImg} alt="Success Key Shop Front" />
                <div className="card-label">Shop Front</div>
             </div>

             {/* Top Right: Interior (Large) */}
             <div className="hero-card card-interior">
                <img src={interiorImg} alt="Interior Shelves" />
                <div className="card-label label-dark">Professional Pharmacists</div>
             </div>

             {/* Bottom Center: Tablets (smaller/anchor) */}
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