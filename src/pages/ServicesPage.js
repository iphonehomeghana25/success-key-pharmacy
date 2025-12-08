import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import HealthScreening from '../components/HealthScreening';
import '../styles/ServicesPage.css';

const ServicesPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* --- Page Header --- */}
      <div className="page-header services-header-bg">
        <div className="header-content">
          <span className="page-subtitle">Expert Care</span>
          <h1>Healthcare Services</h1>
          <p>From rapid prescription delivery to clinical screenings, we are dedicated to keeping Abeka & Lapaz healthy.</p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="page-content">
        
        {/* The General Services & Prescription Upload Guide */}
        <div className="section-spacer">
          <Services />
        </div>

        {/* The Clinical Tests (BP, Malaria, etc.) */}
        <div className="section-spacer">
          <HealthScreening />
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
