import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import db from '../services/supabase.js';
import { generateTokens, generateAccessToken, verifyRefreshToken } from '../utils/jwt.js';
import { authenticate } from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';
import config from '../config/env.js';

const router = Router();

/* --- Zod schemas --- */
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+254[17]\d{8}$/, 'Invalid Kenyan phone number (+254XXXXXXXXX)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/* --- Helper: strip password from user object --- */
function sanitizeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

/* --------------------------------------------------------
   POST /api/auth/register
   -------------------------------------------------------- */
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.', code: 'EMAIL_TAKEN' });
    }

    const password_hash = await bcrypt.hash(password, config.bcryptRounds);
    const user = await db.createUser({ full_name: fullName, email, phone, password_hash });

    const tokens = generateTokens({ userId: user.id, email: user.email, role: user.role });

    return res.status(201).json({ user: sanitizeUser(user), tokens });
  } catch (err) {
    next(err);
  }
});

/* --------------------------------------------------------
   POST /api/auth/login
   -------------------------------------------------------- */
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.', code: 'INVALID_CREDENTIALS' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Account is suspended.', code: 'ACCOUNT_SUSPENDED' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password.', code: 'INVALID_CREDENTIALS' });
    }

    await db.updateLastLogin(user.id);

    const tokens = generateTokens({ userId: user.id, email: user.email, role: user.role });

    return res.json({ user: sanitizeUser(user), tokens });
  } catch (err) {
    next(err);
  }
});

/* --------------------------------------------------------
   POST /api/auth/refresh
   -------------------------------------------------------- */
router.post('/refresh', validate(refreshSchema), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const payload = verifyRefreshToken(refreshToken);

    const user = await db.findUserById(payload.userId);
    if (!user || !user.is_active) {
      return res.status(401).json({ error: 'User not found or inactive.', code: 'INVALID_CREDENTIALS' });
    }

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    return res.json({ accessToken });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message, code: err.code });
    }
    next(err);
  }
});

/* --------------------------------------------------------
   GET /api/auth/me
   -------------------------------------------------------- */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await db.findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.', code: 'NOT_FOUND' });
    }
    return res.json({ user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
});

export default router;
