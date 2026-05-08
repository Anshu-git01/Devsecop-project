const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(helmet());        // security headers
app.use(cors());          // allow frontend to talk to backend
app.use(morgan('dev'));   // request logging
app.use(express.json()); // parse JSON body

// Routes
app.use('/api/products', productRoutes);

// Health check endpoint (Kubernetes will use this later)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', version: '1.0.0' });
});

module.exports = app;