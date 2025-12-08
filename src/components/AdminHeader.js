import React from 'react';
import { Bell, User, Menu } from 'lucide-react'; // Import Menu icon
import '../styles/AdminLayout.css';

const AdminHeader = ({ title, onMenuClick }) => {
  return (
    <header className="admin-header-shell">
      <div className="header-left">
        {/* Mobile Menu Button (Hidden on Desktop via CSS) */}
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        
        <div className="header-title">
          <h1>{title}</h1>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="admin-profile">
          <div className="avatar-circle">
            <User size={20} />
          </div>
          <span className="admin-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
