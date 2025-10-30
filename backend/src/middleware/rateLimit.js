import rateLimit from 'express-rate-limit';

export const baseRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per hour for anonymous users
  message: 'Too many requests from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authenticatedRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: (req) => {
    return req.user?.role === 'admin' ? 5000 : 1000;
  },
  message: 'Rate limit exceeded',
  standardHeaders: true,
  legacyHeaders: false,
});