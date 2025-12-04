import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Clock, ShoppingCart } from 'lucide-react';
import './App.css';

// Simple Coming Soon Component
const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <nav className="navbar">
        <div className="logo-section">
          {/* Using a placeholder for the image logo, replacing the icon */}
          <div className="logo-text">
            <h1>SUCCESS KEY</h1>
            <p>PHARMACY & MINI MART</p>
          </div>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <span className="badge">Serving Abeka, Lapaz & Accra</span>
          <h1>Your Health, Our Ultimate Concern.</h1>
          <p>
            We are upgrading our digital experience. 
            <strong>Success Key Pharmacy & Mini Mart</strong> is your one-stop shop for genuine medicines and provisions.
          </p>
          
          <div className="contact-grid">
            <div className="contact-item">
              <MapPin className="icon" />
              <div>
                <h3>Locate Us</h3>
                <p>Abeka-Lapaz Main Road</p>
                <p className="small-text">Fastest Delivery in Environs</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone className="icon" />
              <div>
                <h3>Call Our Hotlines</h3>
                <p>024 317 9760</p>
                <p>024 646 6416</p>
                <p>030 225 3192</p>
              </div>
            </div>
            <div className="contact-item">
              <ShoppingCart className="icon" />
              <div>
                <h3>Services</h3>
                <p>Pharmacy & Mini Mart</p>
                <p className="small-text">Medicine • Groceries • Delivery</p>
              </div>
            </div>
          </div>

          <button className="cta-button" onClick={() => window.location.href='tel:0243179760'}>
            Call for Delivery: 024 317 9760
          </button>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Success Key Pharmacy & Mini Mart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;
