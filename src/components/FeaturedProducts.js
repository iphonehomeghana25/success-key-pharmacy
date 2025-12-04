import React from 'react';
import '../styles/FeaturedProducts.css';
import { MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

// Mock Data (This will eventually come from Supabase)
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
  
  const handleOrder = (productName) => {
    const message = `Hello Success Key, I would like to inquire about: ${productName}`;
    const url = `https://wa.me/233240000000?text=${encodeURIComponent(message)}`; // Replace with real number
    window.open(url, '_blank');
  };

  return (
    <section className="products-section" id="services">
      <div className="products-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="sub-title">Daily Essentials</span>
          <h2 className="main-title">What We Have in Stock</h2>
          <p className="section-desc">
            We are more than just a pharmacy. Pick up your daily needs and have them delivered via WhatsApp.
          </p>
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
          <button className="btn-view-all">
            See Full Catalogue <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;