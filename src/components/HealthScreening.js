import React from 'react';
import '../styles/HealthScreening.css';
import { Activity, HeartPulse, Droplet, Thermometer, ArrowRight } from 'lucide-react';

// Importing local asset
import pharmacistImg from '../assets/Pharmacist1.jpg';

const HealthScreening = () => {
  return (
    <section className="screening-section">
      <div className="screening-container">
        
        {/* Left: Text & CTA */}
        <div className="screening-content">
          <span className="screening-badge">Wellness Center</span>
          <h2>Know Your Health Status in Minutes</h2>
          <p className="screening-desc">
            You don't need a hospital queue for routine checks. Walk into Success Key Pharmacy for professional, affordable, and quick screening services.
          </p>
          
          <div className="screening-list">
            <div className="screen-item">
              <HeartPulse className="screen-icon" size={24} />
              <div className="screen-text">
                <h4>Blood Pressure Check</h4>
                <p>Hypertension is a silent killer. Monitor yours regularly.</p>
              </div>
            </div>

            <div className="screen-item">
              <Droplet className="screen-icon" size={24} />
              <div className="screen-text">
                <h4>Blood Sugar (Diabetes)</h4>
                <p>Fast and accurate glucose testing.</p>
              </div>
            </div>

            <div className="screen-item">
              <Thermometer className="screen-icon" size={24} />
              <div className="screen-text">
                <h4>Malaria Testing</h4>
                <p>Feeling feverish? Get tested before you treat.</p>
              </div>
            </div>
            
            <div className="screen-item">
              <Activity className="screen-icon" size={24} />
              <div className="screen-text">
                <h4>BMI & Weight Management</h4>
                <p>Check your Body Mass Index and get diet advice.</p>
              </div>
            </div>
          </div>

          <button className="btn-book-test">
            Visit for a Check-up <ArrowRight size={18} />
          </button>
        </div>

        {/* Right: Visual (Local Image) */}
        <div className="screening-image-card">
          <img 
            src={pharmacistImg} 
            alt="Pharmacist checking blood pressure" 
          />
          <div className="floating-stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">mins avg. wait time</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HealthScreening;
