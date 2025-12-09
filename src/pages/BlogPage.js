import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { supabase } from '../supabaseClient'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BlogPage.css';
import { Calendar, User, ArrowRight, FileText } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Data from Supabase ---
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* Page Header */}
      <div className="page-header blog-header-bg">
        <div className="header-content">
          <span className="page-subtitle">Health Tips & News</span>
          <h1>Healthy Living Blog</h1>
          <p>Expert advice, wellness tips, and pharmacy updates from your local health partners.</p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="page-content">
        <section className="blog-section">
          <div className="blog-container">
            
            {loading && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                Loading articles...
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                <p>No articles published yet. Check back soon!</p>
              </div>
            )}

            {!loading && posts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', color: '#94a3b8' }}>
                      <FileText size={48} opacity={0.5} />
                    </div>
                  )}
                  <span className="blog-category">{post.category}</span>
                </div>
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="meta-item">
                      <Calendar size={14} /> 
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span className="meta-item">
                      <User size={14} /> 
                      {post.author || 'Success Key Team'}
                    </span>
                  </div>
                  
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  
                  {/* UPDATE: Replaced <button> with <Link> */}
                  <Link to={`/blog/${post.id}`} className="btn-read-more">
                    Read Article <ArrowRight size={16} />
                  </Link>
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
