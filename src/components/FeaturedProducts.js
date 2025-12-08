import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook
import '../styles/FeaturedProducts.css';
import { MessageCircle, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import miniMartImg from '../assets/interior.jpg';

const products = [
  {
    id: 1,
    name: "Malaria & Fever Relief",
    description: "Coartem, Paracetamol, and rapid testing kits.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Baby Care Essentials",
    description: "Diapers, wipes, formula, and rash creams.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Vitamins & Supplements",
    description: "Immune boosters, Vitamin C, Zinc, and Multivitamins.",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "First Aid & Antiseptics",
    description: "Bandages, methylated spirit, and wound care.",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400",
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate(); // Initialize hook
  
  const handleOrder = (productName) => {
    const message = `Hello Success Key, I would like to inquire about: ${productName}`;
    const url = `https://wa.me/233240000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="products-section" id="products">
      <div className="products-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="sub-title">Daily Essentials</span>
          <h2 className="main-title">Pharmacy & Mini Mart</h2>
          <p className="section-desc">
            We are more than just a pharmacy. Pick up your daily needs and have them delivered.
          </p>
        </div>

        {/* Mini Mart Intro Section */}
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

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
                <div className="overlay">
                  <ShoppingBag size={24} color="#fff" />
                </div>
              </div>
              
              <div className="card-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                
                <button 
                  className="btn-order"
                  onClick={() => handleOrder(product.name)}
                >
                  <MessageCircle size={18} />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="view-all-container">
          <button 
            className="btn-view-all"
            onClick={() => navigate('/catalogue')} // Button now works!
          >
            See Full Catalogue <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
