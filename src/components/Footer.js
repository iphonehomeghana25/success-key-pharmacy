import React from 'react';
import '../styles/Footer.css';
import { ShieldCheck, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand & Intro */}
        <div className="footer-col">
          <div className="footer-logo">
            <ShieldCheck size={28} className="logo-icon-footer" />
            <span className="logo-text-footer">Success Key</span>
          </div>
          <p className="footer-desc">
            Your trusted community pharmacy in Abeka & Lapaz. We provide genuine medicines, expert advice, and daily essentials.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="https://wa.me/233240000000" className="social-icon"><MessageCircle size={20} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Upload Prescription</a></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-col">
          <h3>Our Services</h3>
          <ul className="footer-links">
            <li><a href="#">Prescription Refills</a></li>
            <li><a href="#">Over-the-Counter Meds</a></li>
            <li><a href="#">Baby Care</a></li>
            <li><a href="#">Vitamins & Supplements</a></li>
            <li><a href="#">Pharmacist Consultations</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter / Info */}
        <div className="footer-col">
          <h3>Stay Healthy</h3>
          <p className="footer-small-text">
            Subscribe to receive health tips and restocking alerts.
          </p>
          <form className="footer-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Go</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Success Key Pharmacy & Mini Mart. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
