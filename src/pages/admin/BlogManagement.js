import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function BlogManagement() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <p style={{ color: '#64748b' }}>Write and publish health articles.</p>
        <button style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Plus size={18} /> New Article
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '12px', color: '#94a3b8' }}>
        <FileText size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
        <p>No blog posts found.</p>
      </div>
    </div>
  );
}