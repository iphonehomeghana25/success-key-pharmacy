import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Services from './components/Services';
import HealthScreening from './components/HealthScreening';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import AboutUsPage from './pages/AboutUsPage';
import CataloguePage from './pages/CataloguePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogPage from './pages/BlogPage';
import StaffPortalPage from './pages/StaffPortalPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // Import Dashboard

// Home Page Component
const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HealthScreening />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Contact />
      <FAQ />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <div className="app-container">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          
          {/* Main Pages */}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          {/* Staff Portal & Dashboard */}
          <Route path="/staff-portal" element={<StaffPortalPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} /> {/* Protected Route */}

          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
