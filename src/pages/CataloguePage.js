import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/CataloguePage.css';
import { Search, MessageCircle, Camera, Package } from 'lucide-react';

const CataloguePage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- NEW: State for Real Data ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch from Supabase ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    // Fetch all products from the database
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching catalogue:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  // --- 2. Filter Logic (Same as before but uses state) ---
  const filteredProducts = products.filter(product => {
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

      <div className="catalogue-header">
        <div className="cat-header-content">
          <span className="page-subtitle">Shop Online</span>
          <h1>Product Catalogue</h1>
          <p>Browse our Pharmacy and Mini Mart stock. Order directly via WhatsApp for fast delivery.</p>
        </div>
      </div>

      <div className="catalogue-controls">
        <div className="controls-container">
          
          <div className="cat-tabs">
            {['All', 'Pharmacy', 'Mini Mart', 'Mom & Baby', 'First Aid'].map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

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

      <div className="catalogue-grid-section">
        <div className="grid-container">
          
          {/* Loading State */}
          {loading && (
            <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center' }}>
              <p>Loading products from database...</p>
            </div>
          )}

          {/* Real Data Grid */}
          {!loading && filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="cat-card">
                <div className="cat-image">
                  {/* Handle products without images safely */}
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', color: '#94a3b8' }}>
                      <Package size={40} />
                    </div>
                  )}
                  <div className="cat-category-badge">{product.category}</div>
                </div>
                <div className="cat-details">
                  <h3>{product.name}</h3>
                  {/* Updated Price Display */}
                  <div className="cat-price">GH₵ {product.price}</div>
                  <button onClick={() => handleOrder(product.name)} className="btn-cat-order">
                    <MessageCircle size={18} /> Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="no-results">
                <p>No products found in this category.</p>
              </div>
            )
          )}
        </div>
      </div>

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
