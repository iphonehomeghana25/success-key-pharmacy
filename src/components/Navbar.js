import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Upload, ShieldCheck } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo Section */}
        <Link to="/" className="logo-container" onClick={handleLinkClick}>
          <div className="logo-icon">
            <ShieldCheck size={24} />
          </div>
          <div className="logo-text">
            <h1>SUCCESS KEY</h1>
            <p>Pharmacy & Mini Mart</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-only">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/blog" className="nav-link">Blog</Link> {/* Added Blog Link */}
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Desktop Upload Button */}
        <div className="nav-action desktop-only">
          <button className="btn-upload">
            <Upload size={18} /> Upload Prescription
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={handleLinkClick}>Home</Link>
          <Link to="/about" className="mobile-link" onClick={handleLinkClick}>About Us</Link>
          <Link to="/services" className="mobile-link" onClick={handleLinkClick}>Services</Link>
          <Link to="/blog" className="mobile-link" onClick={handleLinkClick}>Blog</Link> {/* Added Blog Link */}
          <Link to="/contact" className="mobile-link" onClick={handleLinkClick}>Contact</Link>
          <button className="btn-upload mobile-btn" onClick={handleLinkClick}>
             <Upload size={18} /> Upload Prescription
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
