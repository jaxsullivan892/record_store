import { body, param, query, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const catalogValidation = {
  getProducts: [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sort').optional().isIn(['price', 'title', 'artist', '-price', '-title', '-artist']),
    validate
  ],
  getProduct: [
    param('id').notEmpty().isString(),
    validate
  ],
  createProduct: [
    body('title').notEmpty().isString().trim(),
    body('artist').notEmpty().isString().trim(),
    body('price').isFloat({ min: 0 }),
    body('description').optional().isString(),
    validate
  ],
  updateProduct: [
    param('id').notEmpty().isString(),
    body('title').optional().isString().trim(),
    body('artist').optional().isString().trim(),
    body('price').optional().isFloat({ min: 0 }),
    body('description').optional().isString(),
    validate
  ]
};

export const userValidation = {
  register: [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty().isString().trim(),
    validate
  ],
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validate
  ],
  updateProfile: [
    body('name').optional().isString().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    validate
  ]
};

export const orderValidation = {
  createOrder: [
    body('items').isArray({ min: 1 }),
    body('items.*.productId').notEmpty().isString(),
    body('items.*.quantity').isInt({ min: 1 }),
    validate
  ],
  updateOrderStatus: [
    param('id').notEmpty().isString(),
    body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    validate
  ],
  getOrders: [
    query('status').optional().isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validate
  ]
};