import { verifyAccessToken } from '../utils/jwt.js';
import { AuthError } from '../utils/errors.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided', code: 'NO_TOKEN' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(err.status || 401).json({
      error: err.message,
      code: err.code || 'INVALID_TOKEN',
    });
  }
}
