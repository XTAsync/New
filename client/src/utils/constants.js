export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  POOLS: '/pools',
  POOL_DETAIL: '/pools/:slug',
  NAVIGATOR: '/navigator',
  TRANSACTIONS: '/transactions',
  PROFILE: '/profile',
  KYC: '/kyc',
  ADMIN: '/admin',
};

export const ROLES = {
  INVESTOR: 'investor',
  ADMIN: 'admin',
  COMPLIANCE: 'compliance',
  AUDITOR: 'auditor',
};

export const KYC_STATUS = {
  NOT_STARTED: 'not_started',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const POOL_STATUS = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  PAUSED: 'paused',
};

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  DIVIDEND: 'dividend',
};

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const CURRENCY = 'KES';

export const APP_NAME = 'Golden Compass';
export const APP_TAGLINE = 'Regulated Investment Platform';

export const DEMO_CREDENTIALS = {
  INVESTOR: {
    email: 'demo@goldencompass.co.ke',
    password: 'demo123',
  },
  ADMIN: {
    email: 'admin@goldencompass.co.ke',
    password: 'admin123',
  },
};

export const PHONE_REGEX = /^\+254[17]\d{8}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
