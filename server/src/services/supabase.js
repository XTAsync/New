import bcrypt from 'bcryptjs';
import config from '../config/env.js';
import { logger } from '../utils/logger.js';

/* -------------------------------------------------------
   In-memory mock database (used when SUPABASE_URL is unset)
   ------------------------------------------------------- */
const BCRYPT_ROUNDS = config.bcryptRounds;

async function hashPass(plain) {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

const mockUsers = new Map();

async function seedDemoUsers() {
  const users = [
    {
      id: 'demo-investor-001',
      full_name: 'Demo Investor',
      email: 'demo@goldencompass.co.ke',
      phone: '+254712345678',
      password_hash: await hashPass('demo123'),
      role: 'investor',
      kyc_status: 'approved',
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      last_login: null,
    },
    {
      id: 'admin-001',
      full_name: 'Admin User',
      email: 'admin@goldencompass.co.ke',
      phone: '+254700000001',
      password_hash: await hashPass('admin123'),
      role: 'admin',
      kyc_status: 'approved',
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      last_login: null,
    },
  ];

  for (const user of users) {
    mockUsers.set(user.email, user);
  }
  logger.info('[MockDB] Seeded 2 demo users');
}

/* Public interface — mirrors what Supabase client would return */
export const db = {
  async findUserByEmail(email) {
    return mockUsers.get(email) || null;
  },

  async findUserById(id) {
    for (const user of mockUsers.values()) {
      if (user.id === id) return user;
    }
    return null;
  },

  async createUser({ full_name, email, phone, password_hash }) {
    const id = `investor-${Date.now()}`;
    const user = {
      id,
      full_name,
      email,
      phone,
      password_hash,
      role: 'investor',
      kyc_status: 'not_started',
      is_active: true,
      created_at: new Date().toISOString(),
      last_login: null,
    };
    mockUsers.set(email, user);
    return user;
  },

  async updateLastLogin(id) {
    for (const [email, user] of mockUsers.entries()) {
      if (user.id === id) {
        user.last_login = new Date().toISOString();
        mockUsers.set(email, user);
        return;
      }
    }
  },
};

/* -------------------------------------------------------
   Real Supabase client (used when SUPABASE_URL is set)
   ------------------------------------------------------- */
let supabaseClient = null;

async function getSupabaseClient() {
  if (!config.supabaseUrl) return null;
  if (supabaseClient) return supabaseClient;
  const { createClient } = await import('@supabase/supabase-js');
  supabaseClient = createClient(config.supabaseUrl, config.supabaseServiceKey);
  return supabaseClient;
}

/* -------------------------------------------------------
   Unified DB interface — auto-selects mock vs real
   ------------------------------------------------------- */
export async function initDb() {
  if (config.useMockDb) {
    await seedDemoUsers();
    logger.info('[DB] Using in-memory mock database');
    return;
  }
  logger.info('[DB] Using Supabase');
}

export default db;
