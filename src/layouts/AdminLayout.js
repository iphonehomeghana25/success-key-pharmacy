import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AdminHeader from '../components/AdminHeader';
import '../styles/AdminLayout.css';
import { 
  LayoutDashboard, Package, FileText, ShoppingCart, 
  TrendingUp, Star, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  // Desktop collapse state
  const [collapsed, setCollapsed] = useState(false);
  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // --- Auth Check ---
  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/staff-portal');
        }
      } catch (error) {
        console.error("Auth check failed", error);
        navigate('/staff-portal');
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [navigate]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/staff-portal');
  };

  // --- Page Title Logic ---
  let pageTitle = 'Dashboard Overview';
  if (location.pathname.includes('products')) pageTitle = 'Product Inventory';
  if (location.pathname.includes('orders')) pageTitle = 'Order Management';
  if (location.pathname.includes('blog')) pageTitle = 'Blog Posts';
  if (location.pathname.includes('reviews')) pageTitle = 'Customer Reviews';

  if (loading) return <div className="loading-screen">Checking permissions...</div>;

  return (
    <div className="admin-layout">
      
      {/* MOBILE OVERLAY BACKDROP */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        
        {/* Sidebar Header */}
        <div className="sidebar-header">
          {(!collapsed || mobileOpen) && <span className="brand-name">Success Key</span>}
          
          {/* Desktop Collapse Button (Hidden on Mobile) */}
          <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn desktop-only-btn">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <AdminLink to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} label="Overview" icon={<LayoutDashboard size={20} />} collapsed={collapsed} mobileOpen={mobileOpen} />
          <AdminLink to="/admin/products" active={location.pathname === '/admin/products'} label="Products" icon={<Package size={20} />} collapsed={collapsed} mobileOpen={mobileOpen} />
          <AdminLink to="/admin/blog" active={location.pathname === '/admin/blog'} label="Blog" icon={<FileText size={20} />} collapsed={collapsed} mobileOpen={mobileOpen} />
          <AdminLink to="/admin/orders" active={location.pathname === '/admin/orders'} label="Orders" icon={<ShoppingCart size={20} />} collapsed={collapsed} mobileOpen={mobileOpen} />
          <AdminLink to="/admin/sales" active={location.pathname === '/admin/sales'} label="Sales" icon={<TrendingUp size={20} />} collapsed={collapsed} mobileOpen={mobileOpen} />
          <AdminLink to="/admin/reviews" active={location.pathname === '/admin/reviews'} label="Reviews" icon={<Star size={20} />} collapsed={collapsed} mobileOpen={mobileOpen} />
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            {(!collapsed || mobileOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        {/* Pass the toggle function to the header */}
        <AdminHeader title={pageTitle} onMenuClick={() => setMobileOpen(!mobileOpen)} />
        
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Helper Component
function AdminLink({ to, label, icon, active, collapsed, mobileOpen }) {
  // If on mobile, we always show labels (collapsed concept doesn't apply nicely there)
  const showLabel = !collapsed || mobileOpen;

  return (
    <Link to={to} className={`nav-item ${active ? 'active' : ''}`} title={label}>
      <span className="nav-icon">{icon}</span>
      {showLabel && <span className="nav-label">{label}</span>}
    </Link>
  );
}
