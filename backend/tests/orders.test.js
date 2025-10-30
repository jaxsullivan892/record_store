import request from 'supertest'
import app from '../src/server.js'

// These are basic integration tests and expect a running test DB and migrations applied.

describe('Orders endpoints', () => {
  let token
  beforeAll(async () => {
    const email = `orders+${Date.now()}@example.com`
    const reg = await request(app).post('/api/users/register').send({ name: 'OrderTest', email, password: 'pass1234' })
    token = reg.body.token
  })

  it('creates an order atomically', async () => {
    const res = await request(app).post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: 1, quantity: 1, price: 9.99 }] })
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(Array.isArray(res.body.items)).toBe(true)
  }, 20000)
})
