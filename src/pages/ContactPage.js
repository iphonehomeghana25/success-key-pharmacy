import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import '../styles/ContactPage.css';
import { Mail, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* --- Page Header --- */}
      <div className="page-header contact-header-bg">
        <div className="header-content">
          <span className="page-subtitle">Get in Touch</span>
          <h1>We're Here for You</h1>
          <p>Have a question about a prescription or product? Visit us in Abeka or send us a message below.</p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="page-content">
        
        {/* Reuse the Info & Map Section */}
        <div className="section-spacer">
          <Contact />
        </div>

        {/* --- NEW: Message Form Section --- */}
        <section className="message-form-section">
          <div className="form-container">
            <div className="form-header">
              <span className="form-icon-badge"><Mail size={24} /></span>
              <h2>Send a Message</h2>
              <p>We usually reply within a few hours.</p>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="e.g. Kojo Mensah" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="e.g. 024 000 0000" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Product Availability</option>
                  <option>Prescription Issue</option>
                  <option>Delivery Status</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?"></textarea>
              </div>

              <button className="btn-submit-msg">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
