import React, { useState } from 'react';
import { Menu, X, Upload, ShieldCheck } from 'lucide-react';
import '../styles/Navbar.css'; // Assuming you have a Navbar.css

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="logo-container">
          <div className="logo-icon">
            <ShieldCheck size={28} />
          </div>
          <div className="logo-text">
            <h1>SUCCESS KEY</h1>
            <p>PHARMACY & MINI MART</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="nav-menu desktop-only">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Upload Button (Visible on Desktop) */}
        <div className="nav-action desktop-only">
          <button className="btn-upload">
            <Upload size={18} /> Upload Prescription
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-menu">
          <a href="#home" className="mobile-link" onClick={handleLinkClick}>Home</a>
          <a href="#about" className="mobile-link" onClick={handleLinkClick}>About Us</a>
          <a href="#services" className="mobile-link" onClick={handleLinkClick}>Services</a>
          <a href="#contact" className="mobile-link" onClick={handleLinkClick}>Contact</a>
          <button className="btn-upload mobile-btn" onClick={handleLinkClick}>
             <Upload size={18} /> Upload Prescription
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;