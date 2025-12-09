import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import '../styles/ContactPage.css';
import { Mail, Send } from 'lucide-react';

const ContactPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle WhatsApp Redirection
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, phone, subject, message } = formData;

    // Construct the WhatsApp message
    const text = `*New Website Inquiry*\n\n` +
                 `👤 *Name:* ${name}\n` +
                 `📞 *Phone:* ${phone}\n` +
                 `📝 *Subject:* ${subject}\n\n` +
                 `*Message:*\n${message}`;

    // Encode for URL
    const encodedText = encodeURIComponent(text);
    
    // Open WhatsApp (Replace with your actual number)
    window.open(`https://wa.me/233240000000?text=${encodedText}`, '_blank');
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* Page Header */}
      <div className="page-header contact-header-bg">
        <div className="header-content">
          <span className="page-subtitle">Get in Touch</span>
          <h1>We're Here for You</h1>
          <p>Have a question about a prescription or product? Visit us in Abeka or send us a message below.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        
        {/* Info & Map Section */}
        <div className="section-spacer">
          <Contact />
        </div>

        {/* Message Form Section */}
        <section className="message-form-section">
          <div className="form-container">
            <div className="form-header">
              <span className="form-icon-badge"><Mail size={24} /></span>
              <h2>Send a Message</h2>
              <p>We usually reply within a few minutes via WhatsApp.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="e.g. Kojo Mensah" 
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="e.g. 024 000 0000" 
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <select name="subject" onChange={handleChange}>
                  <option>General Inquiry</option>
                  <option>Product Availability</option>
                  <option>Prescription Issue</option>
                  <option>Delivery Status</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message"
                  rows="5" 
                  placeholder="How can we help you?"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit-msg">
                <Send size={18} /> Send to WhatsApp
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
