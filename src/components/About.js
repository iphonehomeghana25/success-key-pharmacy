import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css';
import { Users, Clock, MapPin } from 'lucide-react';
import teamImg from '../assets/interior.jpg'; 

const About = ({ showButton = true }) => { // Accepted new prop with default value
  const navigate = useNavigate();

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* Left Side: Image/Visuals */}
        <div className="about-image-wrapper">
          <img src={teamImg} alt="Success Key Pharmacy Team" className="main-about-img" />
          
          <div className="hours-card">
            <div className="hours-icon">
              <Clock size={20} />
            </div>
            <div>
              <h4>Open Mon - Sat</h4>
              <p>6:00 AM - 11:30 PM</p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="about-content">
          <span className="about-badge">About Success Key</span>
          <h2>Your Local Health Partner in Abeka & Lapaz</h2>
          
          <p className="about-text">
            For years, <strong>Success Key Pharmacy & Mini Mart</strong> has been the go-to destination for families in our community. We believe healthcare should be accessible, personal, and trustworthy.
          </p>
          
          <p className="about-text">
            Beyond just medicines, we stock a wide range of household essentials, baby products, and toiletries, making us your convenient one-stop shop.
          </p>

          <div className="about-features">
            <div className="feature-item">
              <Users className="feature-icon" size={24} />
              <div>
                <h4>Expert Pharmacists</h4>
                <p>Ready to answer your questions.</p>
              </div>
            </div>
            <div className="feature-item">
              <MapPin className="feature-icon" size={24} />
              <div>
                <h4>Community First</h4>
                <p>Located right on the main road for easy access.</p>
              </div>
            </div>
          </div>

          {/* Conditional Rendering: Only show button if showButton is true */}
          {showButton && (
            <button 
              className="btn-learn-more"
              onClick={() => navigate('/about')}
            >
              More About Us
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default About;
