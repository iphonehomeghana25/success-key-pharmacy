import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/LegalPages.css';

const TermsPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: October 2025</p>

        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Success Key Pharmacy website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Medical Disclaimer</h2>
          <p>
            <strong>This website does not provide medical advice.</strong> The content provided here is for informational purposes only. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
            of your physician or qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Products & Pricing</h2>
          <p>
            Prices for products are subject to change without notice. We reserve the right at any time to modify or discontinue 
            any product (or any part or content thereof) without notice.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Delivery Policy</h2>
          <p>
            Delivery times are estimates and may vary due to traffic or weather conditions in Accra. We are not responsible for 
            delays caused by incorrect address information provided by the customer.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Returns & Refunds</h2>
          <p>
            Due to safety regulations, <strong>we cannot accept returns on prescription medications</strong> once they have left the pharmacy. 
            For Mini Mart items, returns are accepted within 24 hours if the item is defective.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
