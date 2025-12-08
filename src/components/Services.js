import React from 'react';
import '../styles/Services.css';
import { Truck, ShieldCheck, Stethoscope, Camera, Send, PackageCheck, Upload } from 'lucide-react';

const Services = () => {
  
  // Function to handle WhatsApp click
  const handleUploadClick = () => {
    const message = "Hello Success Key, I want to upload a prescription.";
    window.open(`https://wa.me/233240000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        
        {/* --- PART 1: Core Services Grid --- */}
        <div className="services-header">
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">Complete Healthcare & Convenience</h2>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="icon-box green-bg">
              <ShieldCheck size={32} />
            </div>
            <h3>Genuine Medicines</h3>
            <p>We source directly from certified manufacturers. No fakes, guaranteed safety.</p>
          </div>

          <div className="service-card">
            <div className="icon-box blue-bg">
              <Stethoscope size={32} />
            </div>
            <h3>Pharmacist Consultations</h3>
            <p>Speak with our licensed professionals about dosage, side effects, and wellness.</p>
          </div>

          <div className="service-card">
            <div className="icon-box orange-bg">
              <Truck size={32} />
            </div>
            <h3>Fast Local Delivery</h3>
            <p>We deliver rapidly to Abeka, Lapaz, Tesano, and surrounding areas.</p>
          </div>
        </div>

        {/* --- PART 2: How Prescription Upload Works --- */}
        {/* The Dark Banner "Cart" */}
        <div className="how-it-works-banner">
          <div className="banner-content">
            <h3>Prescription Refills Made Simple</h3>
            <p>Don't have time to visit? Just send us a picture.</p>
            
            <div className="steps-wrapper">
              <div className="step-item">
                <div className="step-icon"><Camera size={24} /></div>
                <span>1. Snap a Photo</span>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-icon"><Send size={24} /></div>
                <span>2. Upload / WhatsApp</span>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-icon"><PackageCheck size={24} /></div>
                <span>3. We Deliver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button is now OUTSIDE the banner */}
        <div className="services-action-area">
          <button onClick={handleUploadClick} className="btn-services-upload">
            <Upload size={20} /> Upload Prescription Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;
