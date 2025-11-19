import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export default function App() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('u1');
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/products`).then(r => setProducts(r.data)).catch(console.error);
  }, []);

  const fetchRecs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/recommend/${userId}`);
      setRecs(res.data.recommendations || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mr.Ingenuity — Demo Store</h1>
      <div style={{ marginBottom: 10 }}>
        <label>User ID: </label>
        <input value={userId} onChange={e => setUserId(e.target.value)} />
        <button onClick={fetchRecs} style={{ marginLeft: 8 }}>Get Recommendations</button>
      </div>

      <h2>Recommended for {userId}</h2>
      <ProductList products={products.filter(p => recs.includes(p.id))} />

      <h2>All Products</h2>
      <ProductList products={products} />
    </div>
  );
}