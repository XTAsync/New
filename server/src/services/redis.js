import config from '../config/env.js';
import { logger } from '../utils/logger.js';

/* -------------------------------------------------------
   In-memory Redis fallback (used when REDIS_URL is unset)
   ------------------------------------------------------- */
const store = new Map();
const expiries = new Map();

const mockRedis = {
  async get(key) {
    if (expiries.has(key) && Date.now() > expiries.get(key)) {
      store.delete(key);
      expiries.delete(key);
      return null;
    }
    return store.get(key) || null;
  },

  async set(key, value, expiryMode, ttlSeconds) {
    store.set(key, value);
    if (expiryMode === 'EX' && ttlSeconds) {
      expiries.set(key, Date.now() + ttlSeconds * 1000);
    }
    return 'OK';
  },

  async del(key) {
    store.delete(key);
    expiries.delete(key);
    return 1;
  },

  async exists(key) {
    if (expiries.has(key) && Date.now() > expiries.get(key)) {
      store.delete(key);
      expiries.delete(key);
      return 0;
    }
    return store.has(key) ? 1 : 0;
  },
};

/* -------------------------------------------------------
   Real Redis client (used when REDIS_URL is set)
   ------------------------------------------------------- */
let redisClient = null;

async function getRealRedis() {
  if (!config.redisUrl) return null;
  if (redisClient) return redisClient;
  const { default: Redis } = await import('ioredis');
  redisClient = new Redis(config.redisUrl);
  redisClient.on('error', (err) => logger.error('Redis error:', err));
  return redisClient;
}

/* -------------------------------------------------------
   Exported redis instance
   ------------------------------------------------------- */
export const redis = config.useMockRedis ? mockRedis : await getRealRedis();

export async function initRedis() {
  if (config.useMockRedis) {
    logger.info('[Redis] Using in-memory Map fallback');
    return;
  }
  await getRealRedis();
  logger.info('[Redis] Connected to Redis');
}

export default redis;
