import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { ShoppingCart, Plus, Search, CheckCircle, Clock, XCircle, Truck, MoreHorizontal } from 'lucide-react';
import '../../styles/admin/OrdersManagement.css'; // We will create this next

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    items_summary: '',
    total_amount: '',
    payment_method: 'Mobile Money',
    status: 'Pending'
  });

  // --- 1. Fetch Orders ---
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching orders:', error);
    else setOrders(data || []);
    setLoading(false);
  };

  // --- 2. Add New Order ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('orders')
        .insert([formData]);

      if (error) throw error;

      fetchOrders();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      alert('Error recording order: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 3. Update Status ---
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Optimistic update
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (error) {
      alert('Error updating status');
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_phone: '',
      items_summary: '',
      total_amount: '',
      payment_method: 'Mobile Money',
      status: 'Pending'
    });
  };

  // Filter Logic
  const filteredOrders = orders.filter(o => 
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toString().includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'green';
      case 'Processing': return 'blue';
      case 'Cancelled': return 'red';
      default: return 'orange';
    }
  };

  return (
    <div className="orders-container">
      
      <div className="orders-header">
        <div>
          <h2>Order Book</h2>
          <p style={{ color: '#64748b' }}>Record and track WhatsApp & Walk-in sales.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Record Order
        </button>
      </div>

      <div className="orders-controls">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by customer name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        {loading ? (
          <p className="p-4 text-center">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">No orders recorded yet.</div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total (GH₵)</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    <div className="fw-bold">{order.customer_name}</div>
                    <div className="text-small">{order.customer_phone}</div>
                  </td>
                  <td className="text-small" style={{ maxWidth: '200px' }}>{order.items_summary}</td>
                  <td className="fw-bold">{order.total_amount}</td>
                  <td>{order.payment_method}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="status-actions">
                      <button title="Mark Delivered" onClick={() => updateStatus(order.id, 'Delivered')} className="btn-icon success"><CheckCircle size={16}/></button>
                      <button title="Mark Processing" onClick={() => updateStatus(order.id, 'Processing')} className="btn-icon info"><Truck size={16}/></button>
                      <button title="Cancel Order" onClick={() => updateStatus(order.id, 'Cancelled')} className="btn-icon danger"><XCircle size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- RECORD ORDER MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record New Sale</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.customer_name}
                    onChange={e => setFormData({...formData, customer_name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.customer_phone}
                    onChange={e => setFormData({...formData, customer_phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Items Purchased (Summary)</label>
                <textarea 
                  rows="2" 
                  placeholder="e.g. 2x Malaria Kit, 1x Cerelac"
                  required
                  value={formData.items_summary}
                  onChange={e => setFormData({...formData, items_summary: e.target.value})}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Total Amount (GH₵)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required 
                    value={formData.total_amount}
                    onChange={e => setFormData({...formData, total_amount: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select 
                    value={formData.payment_method}
                    onChange={e => setFormData({...formData, payment_method: e.target.value})}
                  >
                    <option>Mobile Money</option>
                    <option>Cash</option>
                    <option>POS / Card</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Initial Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Delivered</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Recording...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
