import express from 'express';

export const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - artist
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the record
 *         title:
 *           type: string
 *           description: The title of the record
 *         artist:
 *           type: string
 *           description: The artist or band name
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the record in USD
 *         description:
 *           type: string
 *           description: Detailed description of the record
 */

/**
 * @swagger
 * /api/catalog:
 *   get:
 *     summary: Get all records
 *     description: Retrieve a list of all vinyl records available in the catalog
 *     tags: [Catalog]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: A list of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 */
router.get('/', async (req, res) => {
  const items = new Array(8).fill(0).map((_, i) => ({ 
    id: String(i+1), 
    title: `Record ${i+1}`, 
    artist: 'Various', 
    price: 14.99 + i 
  }));
  res.json(items);
});

/**
 * @swagger
 * /api/catalog/{id}:
 *   get:
 *     summary: Get a record by ID
 *     description: Retrieve detailed information about a specific vinyl record
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The record ID
 *     responses:
 *       200:
 *         description: Record details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Record not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json({ 
    id, 
    title: `Record ${id}`, 
    artist: 'Artist', 
    price: 19.99, 
    description: 'Stub product description' 
  });
});
