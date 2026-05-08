const request = require('supertest');
const app = require('../src/server');

describe('Health Check', () => {
  test('GET /health returns UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });
});

describe('Products API', () => {
  test('GET /api/products returns all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/products/:id returns one product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('GET /api/products/:id returns 404 for missing product', async () => {
    const res = await request(app).get('/api/products/9999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/products creates a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Monitor', price: 399, category: 'Electronics' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Monitor');
  });

  test('POST /api/products returns 400 when fields missing', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Incomplete' });
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /api/products/:id deletes a product', async () => {
    const res = await request(app).delete('/api/products/1');
    expect(res.statusCode).toBe(204);
  });
});