import express from 'express';
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
  const orders = [
    {
      id: '1001',
      userId: req.user.userId,
      status: 'pending',
      items: [
        { productId: '1', quantity: 1, price: 29.99 }
      ],
      total: 29.99,
      createdAt: new Date().toISOString()
    }
  ];
  res.json(orders);
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
  const order = {
    id: req.params.id,
    userId: req.user.userId,
    status: 'pending',
    items: [
      { productId: '1', quantity: 1, price: 29.99 }
    ],
    total: 29.99,
    createdAt: new Date().toISOString()
  };
  res.json(order);
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
  const order = {
    id: String(Math.floor(Math.random() * 100000)),
    userId: req.user.userId,
    status: 'pending',
    items: req.body.items,
    total: req.body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    createdAt: new Date().toISOString()
  };
  res.status(201).json(order);
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
  const order = {
    id: req.params.id,
    userId: 'user123',
    status: req.body.status,
    items: [{ productId: '1', quantity: 1, price: 29.99 }],
    total: 29.99,
    createdAt: new Date().toISOString()
  };
  res.json(order);
});
