import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from '../supabaseClient'; // Import Supabase
import '../styles/Footer.css';
import { ShieldCheck, Facebook, Instagram, Twitter, MessageCircle, Check, Loader } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation code
          alert('You are already subscribed!');
          setStatus('idle');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000); // Reset after 3s
    }
  };

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
            <a href="https://www.instagram.com/successkey_pharmacy_limited/" target="_blank" rel="noreferrer" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="https://wa.me/233240000000" className="social-icon"><MessageCircle size={20} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/staff-portal">Staff Portal</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-col">
          <h3>Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/catalogue">Prescription Refills</Link></li>
            <li><Link to="/catalogue">Over-the-Counter Meds</Link></li>
            <li><Link to="/catalogue">Baby Care</Link></li>
            <li><Link to="/catalogue">Vitamins & Supplements</Link></li>
            <li><Link to="/services">Pharmacist Consultations</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter / Info */}
        <div className="footer-col">
          <h3>Stay Healthy</h3>
          <p className="footer-small-text">
            Subscribe to receive health tips and restocking alerts.
          </p>
          
          {status === 'success' ? (
            <div className="success-message" style={{ color: '#4ade80', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={20} /> Subscribed!
            </div>
          ) : (
            <form className="footer-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? <Loader className="spin" size={16} /> : 'Go'}
              </button>
            </form>
          )}
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-legal-row">
          <p>&copy; {new Date().getFullYear()} Success Key Pharmacy & Mini Mart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="developer-credit">
          <p>Developed by Suleman / Mistah kweku {'{'} Eazi Tech Llc 020 281 3298 / 054 901 0934 {'}'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
