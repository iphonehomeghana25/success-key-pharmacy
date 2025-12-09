import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BlogPostPage.css'; // We'll create this next
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single(); // .single() is important when fetching by ID

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="loading-container">Loading article...</div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="not-found-container">
          <h2>Article not found</h2>
          <Link to="/blog" className="back-link">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <article className="single-post-container">
        {/* Navigation Back */}
        <div className="post-header">
          <Link to="/blog" className="back-nav">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          
          <span className="post-category-badge">{post.category}</span>
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta-row">
            <span className="meta-item"><User size={16} /> {post.author || 'Success Key Team'}</span>
            <span className="meta-item"><Calendar size={16} /> {new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Hero Image */}
        {post.image_url && (
          <div className="post-hero-image">
            <img src={post.image_url} alt={post.title} />
          </div>
        )}

        {/* Post Content */}
        <div className="post-body">
            {/* We split by newlines to create paragraphs since text areas save raw text */}
            {post.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() !== "" && <p key={idx}>{paragraph}</p>
            ))}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
