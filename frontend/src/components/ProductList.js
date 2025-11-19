import React from 'react';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <div>No products</div>;
  }
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {products.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, width: 200 }}>
          <div style={{ fontWeight: 'bold' }}>{p.title}</div>
          <div>${p.price}</div>
        </div>
      ))}
    </div>
  );
}