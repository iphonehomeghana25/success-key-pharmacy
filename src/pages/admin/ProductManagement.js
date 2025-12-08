import React from 'react';
import { Package, Plus } from 'lucide-react';

export default function ProductManagement() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <p style={{ color: '#64748b' }}>Manage your pharmacy and mini-mart inventory here.</p>
        <button style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '12px', color: '#94a3b8' }}>
        <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
        <p>No products loaded from database yet.</p>
      </div>
    </div>
  );
}