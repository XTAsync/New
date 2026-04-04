import jwt from 'jsonwebtoken';
import { AuthError } from './errors.js';

const JWT_SECRET = process.env.JWT_SECRET || 'gc-dev-secret-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'gc-dev-refresh-secret-change-in-production';

const ACCESS_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRY });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
  return { access: accessToken, refresh: refreshToken };
}

export function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRY });
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthError('Token expired', 'TOKEN_EXPIRED');
    }
    throw new AuthError('Invalid token');
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthError('Refresh token expired', 'REFRESH_TOKEN_EXPIRED');
    }
    throw new AuthError('Invalid refresh token');
  }
}
