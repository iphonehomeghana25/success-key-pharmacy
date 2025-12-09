import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import Supabase
import '../styles/FeaturedProducts.css';
import { MessageCircle, ShoppingBag, ArrowRight, ShoppingCart, Package } from 'lucide-react';
import miniMartImg from '../assets/mart.jpg';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  // --- NEW: State for Real Data ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only the latest 4 items for the homepage
  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4); // Only get 4 items

      if (error) console.error('Error fetching featured:', error);
      else setProducts(data || []);
      
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  const handleOrder = (productName) => {
    const message = `Hello Success Key, I would like to inquire about: ${productName}`;
    const url = `https://wa.me/233246466416?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="products-section" id="products">
      <div className="products-container">
        
        <div className="section-header">
          <span className="sub-title">Daily Essentials</span>
          <h2 className="main-title">Pharmacy & Mini Mart</h2>
          <p className="section-desc">
            We are more than just a pharmacy. Pick up your daily needs and have them delivered.
          </p>
        </div>

        {/* Mini Mart Feature Block */}
        <div className="mini-mart-feature">
          <div className="mini-mart-content">
            <div className="mart-icon-badge">
              <ShoppingCart size={20} />
            </div>
            <h3>Grab Your Groceries Too!</h3>
            <p>
              Why stop twice? We stock a wide range of food commodities and beverages. 
              From <strong>Don Simon</strong> juices to breakfast provisions and snacks, 
              get everything you need in one trip.
            </p>
            <div className="tag-container">
              <span className="mart-tag">Juices & Drinks</span>
              <span className="mart-tag">Provisions</span>
              <span className="mart-tag">Toiletries</span>
              <span className="mart-tag">Snacks</span>
            </div>
          </div>
          <div className="mini-mart-image">
            <img src={miniMartImg} alt="Success Key Mini Mart Interior" />
          </div>
        </div>

        {/* --- Real Data Grid --- */}
        <div className="products-grid">
          {loading ? (
             <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b' }}>
               Loading latest arrivals...
             </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-wrapper">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#cbd5e1' }}>
                      <Package size={40} />
                    </div>
                  )}
                  <div className="overlay">
                    <ShoppingBag size={24} color="#fff" />
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{product.name}</h3>
                  {/* Added Price Display with Cedi Symbol */}
                  <p style={{ color: '#15803d', fontWeight: '800', margin: '0.25rem 0' }}>
                    GH₵ {product.price}
                  </p>
                  <p>{product.description || product.category}</p>
                  
                  <button 
                    className="btn-order"
                    onClick={() => handleOrder(product.name)}
                  >
                    <MessageCircle size={18} />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="view-all-container">
          <button 
            className="btn-view-all"
            onClick={() => navigate('/catalogue')}
          >
            See Full Catalogue <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
