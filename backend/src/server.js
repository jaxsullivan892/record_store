import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';
import { router as catalogRouter } from './routes/catalog.js';
import { router as ordersRouter } from './routes/orders.js';
import { router as usersRouter } from './routes/users.js';
import { baseRateLimit, authenticatedRateLimit } from './middleware/rateLimit.js';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
app.use('/api/', baseRateLimit);
app.use(['/api/orders', '/api/users/profile'], authenticatedRateLimit);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// Routes
app.use('/api/catalog', catalogRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export app for tests and programmatic usage
export default app;