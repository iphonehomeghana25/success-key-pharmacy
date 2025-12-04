import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Services from './components/Services';
import HealthScreening from './components/HealthScreening'; // Import here
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Home Page Component
const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HealthScreening /> {/* Added Health Screening Section */}
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
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* Footer is placed here so it shows on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
