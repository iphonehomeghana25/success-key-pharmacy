import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import '../../styles/admin/SalesAnalytics.css'; // Creating this next
import { TrendingUp, CreditCard, Calendar, DollarSign, Activity } from 'lucide-react';

export default function SalesAnalytics() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    momoCount: 0,
    cashCount: 0
  });

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    setLoading(true);
    // Fetch only completed or pending orders (exclude cancelled)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .neq('status', 'Cancelled')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sales data:', error);
    } else {
      setOrders(data || []);
      calculateMetrics(data || []);
    }
    setLoading(false);
  };

  const calculateMetrics = (data) => {
    const totalRev = data.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);
    const count = data.length;
    const avg = count > 0 ? totalRev / count : 0;
    
    // Payment Methods
    const momo = data.filter(o => o.payment_method === 'Mobile Money').length;
    const cash = data.filter(o => o.payment_method === 'Cash').length;

    setMetrics({
      totalRevenue: totalRev,
      totalOrders: count,
      avgOrderValue: avg,
      momoCount: momo,
      cashCount: cash
    });
  };

  return (
    <div className="analytics-container">
      
      <div className="analytics-header">
        <div>
          <h2>Sales Analytics</h2>
          <p style={{ color: '#64748b' }}>Overview of financial performance.</p>
        </div>
        <div className="date-filter-badge">
          <Calendar size={16} /> All Time Data
        </div>
      </div>

      {/* --- METRICS CARDS --- */}
      <div className="metrics-grid">
        <div className="metric-card green">
          <div className="metric-icon"><DollarSign size={24} /></div>
          <div>
            <p>Total Revenue</p>
            <h3>GH₵ {metrics.totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="metric-card blue">
          <div className="metric-icon"><TrendingUp size={24} /></div>
          <div>
            <p>Total Orders</p>
            <h3>{metrics.totalOrders}</h3>
          </div>
        </div>

        <div className="metric-card purple">
          <div className="metric-icon"><Activity size={24} /></div>
          <div>
            <p>Avg. Order Value</p>
            <h3>GH₵ {metrics.avgOrderValue.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* --- BREAKDOWN SECTION --- */}
      <div className="analytics-content-row">
        
        {/* Payment Methods */}
        <div className="analytics-card">
          <h3>Payment Methods</h3>
          <div className="payment-breakdown">
            <div className="payment-item">
              <div className="pay-info">
                <span className="pay-icon momo"><CreditCard size={18}/></span>
                <span>Mobile Money</span>
              </div>
              <span className="pay-count">{metrics.momoCount} orders</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill momo-fill" 
                style={{ width: `${(metrics.momoCount / (metrics.totalOrders || 1)) * 100}%` }}
              ></div>
            </div>

            <div className="payment-item mt-4">
              <div className="pay-info">
                <span className="pay-icon cash"><DollarSign size={18}/></span>
                <span>Cash</span>
              </div>
              <span className="pay-count">{metrics.cashCount} orders</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill cash-fill" 
                style={{ width: `${(metrics.cashCount / (metrics.totalOrders || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="analytics-card flex-grow">
          <h3>Recent Transactions</h3>
          <div className="transactions-list">
            {loading ? (
              <p>Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-muted">No sales recorded yet.</p>
            ) : (
              orders.slice(0, 5).map(order => (
                <div key={order.id} className="transaction-row">
                  <div>
                    <div className="trans-name">{order.customer_name}</div>
                    <div className="trans-date">{new Date(order.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="trans-amount">+ GH₵ {order.total_amount}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
