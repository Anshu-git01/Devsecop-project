import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/products`)
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => { setError('Failed to fetch products'); setLoading(false); });
  }, [refresh]);

  const handleDelete = (id) => {
    axios.delete(`${API}/api/products/${id}`)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch(() => alert('Delete failed'));
  };

  if (loading) return <div className="card">Loading...</div>;
  if (error)   return <div className="card error">{error}</div>;

  return (
    <div className="card">
      <h2>Products ({products.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td><span className="badge">{p.category}</span></td>
              <td>${p.price}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;