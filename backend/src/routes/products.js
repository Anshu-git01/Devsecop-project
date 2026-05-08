const express = require('express');
const router = express.Router();

// In-memory store (we'll replace with a real DB later)
let products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Desk Chair', price: 299, category: 'Furniture' },
  { id: 3, name: 'Keyboard', price: 79, category: 'Electronics' },
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST create product
router.post('/', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'name, price and category are required' });
  }
  const product = {
    id: products.length + 1,
    name,
    price,
    category
  };
  products.push(product);
  res.status(201).json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;