import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AddProduct({ onProductAdded }) {
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    axios.post(`${API}/api/products`, {
      ...form,
      price: parseFloat(form.price)
    })
    .then(() => {
      setForm({ name: '', price: '', category: '' });
      onProductAdded();
    })
    .catch(() => setError('Failed to add product. Check all fields.'));
  };

  return (
    <div className="card">
      <h2>Add Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;