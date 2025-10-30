const request = require('supertest');
const { Pool } = require('pg');
const pool = new Pool({ user: 'postgres', password: 'postgres', host: 'localhost', port: 5433, database: 'record_store' });
const { spawn } = require('child_process');

jest.setTimeout(30000);

describe('Orders endpoints', () => {
  let productId;
  let serverProc;
  const base = 'http://localhost:3000';

  beforeAll(async () => {
    // Insert a product to order against
    const res = await pool.query(
      'INSERT INTO sr_discogs_inventory (title, artist, price, quantity) VALUES ($1,$2,$3,$4) RETURNING id, price',
      ['Test Album', 'Test Artist', 9.99, 10]
    );
    productId = res.rows[0].id;

    // Start the server
    serverProc = spawn('node', ['src/server.js'], {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test', PORT: '3000', PGHOST: 'localhost', PGPORT: '5433', PGDATABASE: 'record_store', PGUSER: 'postgres', PGPASSWORD: 'postgres', JWT_SECRET: 'test_secret' },
    });

    serverProc.stderr.on('data', (d) => process.stderr.write(d));

    // Poll the server until it responds
    for (let i = 0; i < 60; i++) {
      try {
        const r = await request(base).get('/api/docs');
        if (r.statusCode) return;
      } catch (e) {
        // retry
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error('Server did not become ready in time');
  });

  afterAll(async () => {
    if (serverProc) serverProc.kill();
    await pool.query('DELETE FROM order_items');
    await pool.query('DELETE FROM orders');
    await pool.query('DELETE FROM sr_discogs_inventory WHERE title = $1', ['Test Album']);
    await pool.end();
  });

  test('create order and return its data', async () => {
    const email = `order+${Date.now()}@example.com`;
    const password = 'orderpass';
    const name = 'Order User';

    await request(base).post('/api/users/register').send({ email, password, name }).expect(201);
    const login = await request(base).post('/api/users/login').send({ email, password }).expect(200);
    const token = login.body.token;

    const orderPayload = {
      items: [ { productId, quantity: 1, price: 9.99 } ],
      shipping_address: '123 Test St'
    };

    const res = await request(base)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderPayload)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.total).toBeCloseTo(9.99);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
