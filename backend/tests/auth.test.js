import request from 'supertest'
import app from '../src/server.js'

// NOTE: These integration tests expect a running test database and the
// appropriate environment variables (POSTGRES_*) configured for the test DB.
// Run `npm run migrate` against the test DB before running tests.

describe('Auth endpoints', () => {
  it('registers a new user and returns a token', async () => {
    const email = `test+${Date.now()}@example.com`
    const res = await request(app).post('/api/users/register').send({ name: 'Test', email, password: 'pass1234' })
    expect([200,201]).toContain(res.status)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
  }, 20000)

  it('rejects login with bad credentials', async () => {
    const res = await request(app).post('/api/users/login').send({ email: 'nope@example.com', password: 'wrong' })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })
})
