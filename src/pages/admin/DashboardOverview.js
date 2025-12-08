import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="overview-container">
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Sales" value="GHS 12,450" icon={<DollarSign size={24} />} color="green" />
        <StatCard title="Active Orders" value="18" icon={<ShoppingBag size={24} />} color="blue" />
        <StatCard title="Total Products" value="142" icon={<TrendingUp size={24} />} color="purple" />
        <StatCard title="Customers" value="892" icon={<Users size={24} />} color="orange" />
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
        <p style={{ color: '#64748b' }}>No recent activity to show.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    green: '#dcfce7',
    blue: '#dbeafe',
    purple: '#f3e8ff',
    orange: '#ffedd5'
  };
  
  const textColors = {
    green: '#166534',
    blue: '#1e40af',
    purple: '#6b21a8',
    orange: '#9a3412'
  };

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ background: colors[color], padding: '1rem', borderRadius: '50%', color: textColors[color] }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{title}</p>
        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>{value}</h3>
      </div>
    </div>
  );
}