import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.jsx';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import AdminLoginForm from '../components/auth/AdminLoginForm.jsx';
import useAuthStore from '../store/useAuthStore.js';

const TABS = [
  { id: 'login', label: 'Sign In' },
  { id: 'register', label: 'Register' },
  { id: 'admin', label: 'Admin' },
];

function CompassLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" className="auth-compass">
      <circle cx="32" cy="32" r="30" stroke="var(--color-gold)" strokeWidth="2.5" fill="rgba(212,168,67,0.08)" />
      <circle cx="32" cy="32" r="4" fill="var(--color-gold)" />
      <polygon points="32,8 29,30 35,30" fill="var(--color-gold)" />
      <polygon points="32,56 29,34 35,34" fill="var(--color-text-muted)" />
      <polygon points="56,32 34,29 34,35" fill="var(--color-text-muted)" />
      <polygon points="8,32 30,29 30,35" fill="var(--color-gold)" />
      <line x1="32" y1="4" x2="32" y2="10" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="32" x2="54" y2="32" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="60" x2="32" y2="54" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="32" x2="10" y2="32" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('login');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-bg-orb-1" />
      <div className="auth-bg-orb auth-bg-orb-2" />

      <div className="auth-card animate-fade-in">
        <div className="auth-card-header">
          <CompassLogo />
          <h1 className="auth-title">Golden Compass</h1>
          <p className="auth-subtitle">Regulated Investment Platform</p>
        </div>

        <div className="auth-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`auth-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="auth-tab-content">
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'register' && <RegisterForm />}
          {activeTab === 'admin' && <AdminLoginForm />}
        </div>

        <div className="auth-card-footer">
          <span className="auth-regulated-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            CMA Kenya Regulated
          </span>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: var(--color-bg-primary);
          position: relative;
          overflow: hidden;
        }

        .auth-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .auth-bg-orb-1 {
          width: 400px; height: 400px;
          background: rgba(212, 168, 67, 0.06);
          top: -100px; right: -100px;
        }
        .auth-bg-orb-2 {
          width: 300px; height: 300px;
          background: rgba(59, 130, 246, 0.05);
          bottom: -80px; left: -80px;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-elevated);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .auth-card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 32px 20px;
          gap: 8px;
        }

        .auth-compass {
          filter: drop-shadow(0 0 16px rgba(212, 168, 67, 0.3));
        }

        .auth-title {
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: -0.02em;
          margin-top: 4px;
        }

        .auth-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        .auth-tabs {
          display: flex;
          border-bottom: 1px solid var(--color-border);
          padding: 0 32px;
          gap: 0;
        }

        .auth-tab {
          flex: 1;
          padding: 12px 8px;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--color-text-muted);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .auth-tab:hover {
          color: var(--color-text-secondary);
        }

        .auth-tab.active {
          color: var(--color-gold);
          border-bottom-color: var(--color-gold);
          font-weight: 600;
        }

        .auth-tab-content {
          padding: 28px 32px 24px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-icon-wrap {
          position: relative;
        }
        .input-icon-wrap .form-input {
          padding-right: 44px;
        }
        .input-icon-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
          padding: 4px;
          display: flex;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
        }
        .input-icon-btn:hover { color: var(--color-text-secondary); }

        .auth-error-banner {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 0.875rem;
          color: var(--color-error);
        }

        .auth-demo-hint {
          text-align: center;
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          padding: 10px 0 0;
          border-top: 1px solid var(--color-border);
          margin-top: 4px;
        }

        .admin-access-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(212, 168, 67, 0.08);
          border: 1px solid var(--color-border-gold);
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          color: var(--color-gold);
        }

        .admin-submit {
          border-width: 1.5px;
        }

        .auth-card-footer {
          display: flex;
          justify-content: center;
          padding: 14px 32px;
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
        }

        .auth-regulated-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        @media (max-width: 480px) {
          .auth-card-header { padding: 24px 20px 16px; }
          .auth-tabs { padding: 0 20px; }
          .auth-tab-content { padding: 20px 20px 16px; }
          .auth-card-footer { padding: 12px 20px; }
        }
      `}</style>
    </div>
  );
}
