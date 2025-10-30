const request = require('supertest');
const { Pool } = require('pg');
const pool = new Pool({ user: 'postgres', password: 'postgres', host: 'localhost', port: 5433, database: 'record_store' });
const { spawn } = require('child_process');

// Allow longer time for DB and server startup
jest.setTimeout(30000);

describe('Auth endpoints', () => {
  let serverProc;
  const base = 'http://localhost:3000';

  beforeAll(async () => {
    // Start the server as a child process so tests can run against it
    serverProc = spawn('node', ['src/server.js'], {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test', PORT: '3000', PGHOST: 'localhost', PGPORT: '5433', PGDATABASE: 'record_store', PGUSER: 'postgres', PGPASSWORD: 'postgres', JWT_SECRET: 'test_secret' },
    });

    serverProc.stderr.on('data', (d) => process.stderr.write(d));

    // Poll the server until it responds
    for (let i = 0; i < 60; i++) {
      try {
        const res = await request(base).get('/api/docs');
        if (res.statusCode) return;
      } catch (e) {
        // ignore and retry
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error('Server did not become ready in time');
  });

  afterAll(async () => {
    if (serverProc) {
      serverProc.kill();
    }
    await pool.end();
  });

  test('register -> login -> profile', async () => {
    const email = `test+${Date.now()}@example.com`;
    const password = 'pass1234';
    const name = 'Test User';

    const reg = await request(base)
      .post('/api/users/register')
      .send({ email, password, name })
      .expect(201);

    expect(reg.body.token).toBeDefined();
    expect(reg.body.user).toBeDefined();
    expect(reg.body.user.email).toBe(email);

    const login = await request(base)
      .post('/api/users/login')
      .send({ email, password })
      .expect(200);

    expect(login.body.token).toBeDefined();

    const token = login.body.token;

    const profile = await request(base)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(profile.body.email).toBe(email);
  });
});
