import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, Home } from 'lucide-react';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-icon">
            <AlertTriangle size={80} />
          </div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link to="/" className="btn-back-home">
            <Home size={20} /> Go Back Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
