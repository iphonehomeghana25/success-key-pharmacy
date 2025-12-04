import React from 'react';
import '../styles/Contact.css';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* --- Left Side: Contact Info --- */}
        <div className="contact-info">
          <span className="contact-badge">Visit Us</span>
          <h2>We are Right in Your Neighborhood</h2>
          <p className="contact-desc">
            Whether you need a quick consultation or a prescription refill, our doors are open.
          </p>

          <div className="info-items">
            
            <div className="info-item">
              <div className="icon-circle">
                <MapPin size={24} />
              </div>
              <div>
                <h4>Location</h4>
                <p>Abeka - Lapaz Main Road<br/>(Near Total Filling Station)</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle">
                <Phone size={24} />
              </div>
              <div>
                <h4>Call Us</h4>
                <p>
                  <a href="tel:+233240000000">024 000 0000</a> <br/>
                  <a href="tel:+233200000000">020 000 0000</a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle">
                <Clock size={24} />
              </div>
              <div>
                <h4>Opening Hours</h4>
                <p>Mon - Sat: 8:00 AM - 9:30 PM<br/>Sun: 12:00 PM - 6:00 PM</p>
              </div>
            </div>

          </div>

          <button className="btn-get-directions">
            <Send size={18} /> Get Directions
          </button>
        </div>

        {/* --- Right Side: Map --- */}
        <div className="map-wrapper">
          {/* Placeholder for Google Maps Embed */}
          <iframe 
            title="Success Key Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8577583796847!2d-0.2369786852339396!3d5.587392395950854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a1738c2049b%3A0x6b8014528147775!2sLapaz%2C%20Accra!5e0!3m2!1sen!2sgh!4v1682522648792!5m2!1sen!2sgh" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contact;
