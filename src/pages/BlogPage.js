import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BlogPage.css';
import { Calendar, User, ArrowRight } from 'lucide-react';

// --- MOCK DATA (Will come from Supabase later) ---
const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Prevent Malaria This Rainy Season",
    excerpt: "With the rains comes the rise in mosquitoes. Learn the essential steps to keep your family safe from Malaria in Accra.",
    date: "Oct 12, 2025",
    author: "Pharm. K. Mensah",
    category: "Prevention",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Why You Need Vitamin C Daily",
    excerpt: "Vitamin C is not just for colds. Discover how it boosts your immunity, skin health, and overall energy levels.",
    date: "Sep 28, 2025",
    author: "Dr. Sarah Osei",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1616671276445-169d9e1b743a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Understanding High Blood Pressure",
    excerpt: "Hypertension is often called the 'silent killer'. Here is what you need to know about your numbers and when to see a doctor.",
    date: "Sep 15, 2025",
    author: "Pharm. K. Mensah",
    category: "Chronic Care",
    image: "https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "First Aid Essentials for Every Home",
    excerpt: "Accidents happen. Make sure your home medicine cabinet is stocked with these 10 essential items.",
    date: "Aug 30, 2025",
    author: "Success Key Team",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400"
  }
];

const BlogPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* --- Page Header --- */}
      <div className="page-header blog-header-bg">
        <div className="header-content">
          <span className="page-subtitle">Health Tips & News</span>
          <h1>Healthy Living Blog</h1>
          <p>Expert advice, wellness tips, and pharmacy updates from your local health partners.</p>
        </div>
      </div>

      {/* --- Blog Grid --- */}
      <div className="page-content">
        <section className="blog-section">
          <div className="blog-container">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-category">{post.category}</span>
                </div>
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                    <span className="meta-item"><User size={14} /> {post.author}</span>
                  </div>
                  
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  
                  <button className="btn-read-more">
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
