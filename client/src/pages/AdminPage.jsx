import { Shield, Users, BarChart3, FileSearch, Settings } from 'lucide-react';
import useAuthStore from '../store/useAuthStore.js';
import StatusBadge from '../components/common/StatusBadge.jsx';

const ADMIN_CARDS = [
  { icon: Users, title: 'User Management', desc: 'View all investors, manage KYC approvals, suspend accounts.', count: '1,247 users' },
  { icon: BarChart3, title: 'Pool Management', desc: 'Create and manage investment pools, set parameters and fees.', count: '3 active pools' },
  { icon: FileSearch, title: 'Compliance Reports', desc: 'AML/CTF reports, transaction monitoring, audit trails.', count: '12 pending' },
  { icon: Settings, title: 'System Settings', desc: 'Rate limits, API keys, notification templates, fee structures.', count: '' },
];

export default function AdminPage() {
  const { user } = useAuthStore();

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Shield size={22} color="var(--color-gold)" />
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Platform management and compliance dashboard</p>
        </div>
        <StatusBadge status={user?.role} />
      </div>

      <div className="admin-notice card card-padded">
        <Shield size={16} color="var(--color-warning)" />
        <span>
          This area is restricted to <strong>admin</strong>, <strong>compliance</strong>, and <strong>auditor</strong> roles.
          All actions are logged for regulatory audit.
        </span>
      </div>

      <div className="admin-grid">
        {ADMIN_CARDS.map(({ icon: Icon, title, desc, count }) => (
          <div key={title} className="admin-card card card-padded">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="admin-card-icon">
                <Icon size={22} color="var(--color-gold)" />
              </div>
              {count && <span className="badge badge-gold">{count}</span>}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>{title}</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>{desc}</p>
            <button className="btn btn-outline btn-sm" disabled>Coming Soon</button>
          </div>
        ))}
      </div>

      <style>{`
        .admin-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.3);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .admin-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .admin-card { transition: border-color 0.2s; }
        .admin-card:hover { border-color: var(--color-border-gold); }

        .admin-card-icon {
          width: 48px; height: 48px;
          background: var(--color-gold-muted);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
