import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

import { logger } from './utils/logger.js';
import { initDb } from './services/supabase.js';
import { initRedis } from './services/redis.js';
import { generalLimiter, authLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Security middleware ─────────────────────────────── */
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ── Rate limiting ───────────────────────────────────── */
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);

/* ── Routes ──────────────────────────────────────────── */
app.use('/api/auth', authRoutes);

/* ── Health check ────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV });
});

/* ── 404 handler ─────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found`, code: 'NOT_FOUND' });
});

/* ── Error handler ───────────────────────────────────── */
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    code: err.code || 'INTERNAL_ERROR',
  });
});

/* ── Startup ─────────────────────────────────────────── */
async function start() {
  try {
    await initDb();
    await initRedis();
    app.listen(PORT, () => {
      logger.info(`Golden Compass API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
