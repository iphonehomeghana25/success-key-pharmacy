import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/LegalPages.css'; // Shared styles

const PrivacyPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: October 2025</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Success Key Pharmacy. We value your trust and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our website or WhatsApp ordering service.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Details:</strong> Name, phone number, and delivery address provided during orders.</li>
            <li><strong>Health Information:</strong> Images of prescriptions or descriptions of symptoms you voluntarily share via WhatsApp for consultation purposes.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <p>Your data is used strictly for:</p>
          <ul>
            <li>Processing and delivering your orders.</li>
            <li>Contacting you regarding prescription clarifications.</li>
            <li>Improving our inventory based on community needs.</li>
          </ul>
          <p><strong>We do NOT sell your data to third parties.</strong></p>
        </section>

        <section className="legal-section">
          <h2>4. Data Security</h2>
          <p>
            We implement strict security measures to protect your health information. WhatsApp communications are end-to-end encrypted, 
            and our internal records are accessible only by authorized pharmacists and staff.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Contact Us</h2>
          <p>
            If you have questions about this policy, please contact us at <strong>024 000 0000</strong> or visit our shop in Abeka.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
