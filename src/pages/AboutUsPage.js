import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import '../styles/AboutUsPage.css';
import { Heart, Users, Target } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* Page Header */}
      <div className="page-header about-header-bg">
        <div className="header-content">
          <span className="page-subtitle">Who We Are</span>
          <h1>Serving Abeka & Lapaz Since 2020</h1>
          <p>We are more than a pharmacy; we are a community health partner dedicated to your well-being.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        {/* Reuse the About component but HIDE the button */}
        <About showButton={false} />

        {/* Mission & Values */}
        <section className="mission-section">
          <div className="mission-container">
            <div className="mission-card">
              <div className="mission-icon"><Target size={32} /></div>
              <h3>Our Mission</h3>
              <p>To provide accessible, affordable, and genuine healthcare solutions to every family in our neighborhood.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon"><Heart size={32} /></div>
              <h3>Our Values</h3>
              <p>We believe in empathy, integrity, and patient-first care. Your health is our only priority.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon"><Users size={32} /></div>
              <h3>Our Community</h3>
              <p>We are rooted in Abeka-Lapaz. We know our neighbors, and we treat every customer like family.</p>
            </div>
          </div>
        </section>

        {/* Team / Trust */}
        <Testimonials />
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
