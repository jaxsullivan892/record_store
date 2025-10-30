import express from 'express';
import pool from '../db/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

export const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *         quantity:
 *           type: integer
 *           minimum: 1
 *         price:
 *           type: number
 *           format: float
 *     Order:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *           format: float
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user orders or all orders (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
      return res.json(result.rows);
    }
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const orderRes = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    const order = orderRes.rows[0];
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role !== 'admin' && order.user_id !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });
    const itemsRes = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [id]);
    order.items = itemsRes.rows;
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', authMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Invalid items' });

    // Basic validation on items
    for (const it of items) {
      if (!it.productId || !it.quantity || !it.price) return res.status(400).json({ message: 'Each item requires productId, quantity, and price' });
      if (Number(it.quantity) <= 0) return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const total = items.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity)), 0);

    await client.query('BEGIN');
    const insertOrder = await client.query(
      'INSERT INTO orders (user_id, status, total, shipping_address) VALUES ($1, $2, $3, $4) RETURNING id, user_id, status, total, created_at',
      [req.user.userId, 'pending', total, req.body.shipping_address || null]
    );
    const order = insertOrder.rows[0];

    // For each item, ensure inventory is sufficient and decrement in the same transaction
    for (const it of items) {
      // lock the product row
      const prodRes = await client.query('SELECT quantity FROM sr_discogs_inventory WHERE id = $1 FOR UPDATE', [it.productId])
      if (!prodRes.rows.length) {
        await client.query('ROLLBACK')
        return res.status(400).json({ message: `Product ${it.productId} not found` })
      }
      const available = Number(prodRes.rows[0].quantity)
      if (available < Number(it.quantity)) {
        await client.query('ROLLBACK')
        return res.status(400).json({ message: `Insufficient inventory for product ${it.productId}` })
      }

      // decrement inventory
      await client.query('UPDATE sr_discogs_inventory SET quantity = quantity - $1 WHERE id = $2', [it.quantity, it.productId])

      // insert order item
      await client.query('INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)', [order.id, it.productId, it.quantity, it.price]);
    }

    await client.query('COMMIT');

    const itemsRes = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
    order.items = itemsRes.rows;

    res.status(201).json(order);
  } catch (err) {
    await client.query('ROLLBACK').catch(()=>{})
    console.error('Order creation failed:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
});

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const update = await pool.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    if (!update.rows[0]) return res.status(404).json({ message: 'Order not found' });
    res.json(update.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
