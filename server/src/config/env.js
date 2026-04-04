import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  jwtSecret: process.env.JWT_SECRET || 'gc-dev-secret-change-in-production',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'gc-dev-refresh-secret-change-in-production',

  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',

  redisUrl: process.env.REDIS_URL || '',

  useMockDb: !process.env.SUPABASE_URL,
  useMockRedis: !process.env.REDIS_URL,

  bcryptRounds: 12,
};

export default config;
