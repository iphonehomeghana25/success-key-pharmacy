import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// Import Admin System
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProductManagement from './pages/admin/ProductManagement';
import BlogManagement from './pages/admin/BlogManagement';

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
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Staff Login */}
          <Route path="/staff-portal" element={<StaffPortalPage />} />

          {/* --- ADMIN ROUTES (Protected by Layout) --- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            {/* Placeholder routes for now */}
            <Route path="orders" element={<div>Orders Page Coming Soon</div>} />
            <Route path="sales" element={<div>Sales Page Coming Soon</div>} />
            <Route path="reviews" element={<div>Reviews Page Coming Soon</div>} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
