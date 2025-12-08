import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/CataloguePage.css';
import { Search, Filter, MessageCircle, Camera, ShoppingCart } from 'lucide-react';

// --- MOCK DATA (This will come from Supabase later) ---
const allProducts = [
  // Pharmacy Items
  { id: 1, category: 'Pharmacy', name: 'Malaria Relief (Coartem)', price: 'GHS 45.00', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
  { id: 2, category: 'Pharmacy', name: 'Paracetamol Syrup', price: 'GHS 15.00', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400' },
  { id: 3, category: 'Pharmacy', name: 'Vitamin C (1000mg)', price: 'GHS 60.00', image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400' },
  { id: 4, category: 'Pharmacy', name: 'Cough Syrup', price: 'GHS 35.00', image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&q=80&w=400' },

  // Mini Mart Items (Provisions)
  { id: 10, category: 'Mini Mart', name: 'Don Simon Juice (1L)', price: 'GHS 28.00', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400' },
  { id: 11, category: 'Mini Mart', name: 'Kelloggs Corn Flakes', price: 'GHS 45.00', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee8b?auto=format&fit=crop&q=80&w=400' },
  { id: 12, category: 'Mini Mart', name: 'Peak Milk (Tin)', price: 'GHS 12.00', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400' },
  { id: 13, category: 'Mini Mart', name: 'Digestive Biscuits', price: 'GHS 18.00', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400' },

  // Mom & Baby
  { id: 20, category: 'Mom & Baby', name: 'Pampers (Size 3)', price: 'GHS 110.00', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400' },
  { id: 21, category: 'Mom & Baby', name: 'Baby Wipes', price: 'GHS 25.00', image: 'https://images.unsplash.com/photo-1542845831-26f5d16790a1?auto=format&fit=crop&q=80&w=400' },
];

const CataloguePage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredProducts = allProducts.filter(product => {
    const matchesTab = activeTab === 'All' || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOrder = (productName) => {
    const message = `Hello, I saw ${productName} in your catalogue and would like to buy it.`;
    window.open(`https://wa.me/233240000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCustomOrder = () => {
    const message = "Hello, I am looking for a product that is not listed in your catalogue.";
    window.open(`https://wa.me/233240000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* --- Page Header --- */}
      <div className="catalogue-header">
        <div className="cat-header-content">
          <span className="page-subtitle">Shop Online</span>
          <h1>Product Catalogue</h1>
          <p>Browse our Pharmacy and Mini Mart stock. Order directly via WhatsApp for fast delivery.</p>
        </div>
      </div>

      {/* --- Controls Section (Tabs & Search) --- */}
      <div className="catalogue-controls">
        <div className="controls-container">
          
          {/* Tabs */}
          <div className="cat-tabs">
            {['All', 'Pharmacy', 'Mini Mart', 'Mom & Baby'].map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="cat-search">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search for medicines, juice, diapers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="catalogue-grid-section">
        <div className="grid-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="cat-card">
                <div className="cat-image">
                  <img src={product.image} alt={product.name} />
                  <div className="cat-category-badge">{product.category}</div>
                </div>
                <div className="cat-details">
                  <h3>{product.name}</h3>
                  <div className="cat-price">{product.price}</div>
                  <button onClick={() => handleOrder(product.name)} className="btn-cat-order">
                    <MessageCircle size={18} /> Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No products found. Try a different search or specific category.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- "Did We Miss Something?" Banner --- */}
      <div className="missing-item-banner">
        <div className="missing-content">
          <div className="missing-text">
            <h3>Can't find what you need?</h3>
            <p>We have thousands of items in stock that aren't listed here yet.</p>
          </div>
          <button onClick={handleCustomOrder} className="btn-custom-request">
            <Camera size={20} /> Upload Photo / Ask Us
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CataloguePage;
