import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { TrendingUp, Users, ShoppingBag, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Get Product Count
      const { count: productCount, error: prodError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (prodError) throw prodError;

      // 2. Get Orders Data (for sales, active orders, and customers)
      const { data: orders, error: ordError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordError) throw ordError;

      // Calculate Metrics
      const totalRevenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

      const activeCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
      
      // Count unique customers based on phone number
      const uniqueCustomers = new Set(orders.map(o => o.customer_phone)).size;

      setStats({
        totalSales: totalRevenue,
        activeOrders: activeCount,
        totalProducts: productCount || 0,
        totalCustomers: uniqueCustomers
      });

      // Set Recent Activity (Top 5)
      setRecentOrders(orders.slice(0, 5));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#dcfce7'; // green-100
      case 'Processing': return '#dbeafe'; // blue-100
      case 'Cancelled': return '#fee2e2'; // red-100
      default: return '#ffedd5'; // orange-100 (Pending)
    }
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case 'Delivered': return '#166534'; // green-800
      case 'Processing': return '#1e40af'; // blue-800
      case 'Cancelled': return '#991b1b'; // red-800
      default: return '#9a3412'; // orange-800
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: '#64748b' }}>
        Loading dashboard insights...
      </div>
    );
  }

  return (
    <div className="overview-container">
      
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard 
          title="Total Sales" 
          value={`GH₵ ${stats.totalSales.toFixed(2)}`} 
          icon={<DollarSign size={24} />} 
          color="green" 
        />
        <StatCard 
          title="Active Orders" 
          value={stats.activeOrders} 
          icon={<ShoppingBag size={24} />} 
          color="blue" 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={<TrendingUp size={24} />} 
          color="purple" 
        />
        <StatCard 
          title="Unique Customers" 
          value={stats.totalCustomers} 
          icon={<Users size={24} />} 
          color="orange" 
        />
      </div>

      {/* Recent Activity Table */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0f172a', fontSize: '1.25rem' }}>Recent Activity</h3>
        
        {recentOrders.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No recent activity to show.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  <th style={tableHeaderStyle}>Order ID</th>
                  <th style={tableHeaderStyle}>Customer</th>
                  <th style={tableHeaderStyle}>Items</th>
                  <th style={tableHeaderStyle}>Amount</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={tableCellStyle}>#{order.id}</td>
                    <td style={{ ...tableCellStyle, fontWeight: '600' }}>{order.customer_name}</td>
                    <td style={{ ...tableCellStyle, color: '#64748b', fontSize: '0.85rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {order.items_summary}
                    </td>
                    <td style={{ ...tableCellStyle, fontWeight: '700', color: '#0f172a' }}>
                      GH₵ {Number(order.total_amount).toFixed(2)}
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{
                        backgroundColor: getStatusColor(order.status),
                        color: getStatusTextColor(order.status),
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        display: 'inline-block'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ ...tableCellStyle, color: '#94a3b8', fontSize: '0.85rem' }}>
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helper Components & Styles ---

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
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #e2e8f0' }}>
      <div style={{ background: colors[color], padding: '1rem', borderRadius: '50%', color: textColors[color] }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>{title}</p>
        <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#0f172a' }}>{value}</h3>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  textAlign: 'left',
  padding: '1rem',
  color: '#64748b',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  fontWeight: '600'
};

const tableCellStyle = {
  padding: '1rem',
  color: '#334155'
};
