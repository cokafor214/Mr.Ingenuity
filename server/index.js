const express = require('express');
const cors = require('cors');
const axios = require('axios');
const products = require('./products.json');
const app = express();
const PORT = process.env.PORT || 4000;
const RECOMMENDER_URL = process.env.RECOMMENDER_URL || 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json(products);
});

// Proxy to recommender service
app.get('/api/recommend/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  const topK = req.query.top_k || 5;
  try {
    const resp = await axios.get(`${RECOMMENDER_URL}/recommend/${encodeURIComponent(userId)}?top_k=${topK}`);
    res.json(resp.data);
  } catch (err) {
    console.error('Error calling recommender:', err?.message || err);
    res.status(502).json({ error: 'Failed to get recommendations' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
