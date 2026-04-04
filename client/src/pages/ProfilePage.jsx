import { User, Mail, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore.js';
import { getInitials, formatDate } from '../utils/helpers.js';
import StatusBadge from '../components/common/StatusBadge.jsx';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <User size={22} color="var(--color-gold)" />
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Account details and settings</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card card-padded profile-card">
          <div className="avatar" style={{ width: 72, height: 72, fontSize: '1.5rem', margin: '0 auto 16px' }}>
            {getInitials(user?.full_name)}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user?.full_name}</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: 4 }}>{user?.email}</div>
            <div style={{ marginTop: 10 }}>
              <StatusBadge status={user?.role} />
            </div>
          </div>

          <div className="divider" style={{ margin: '20px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="profile-field">
              <Mail size={15} color="var(--color-text-muted)" />
              <div>
                <div className="profile-field-label">Email</div>
                <div className="profile-field-value">{user?.email}</div>
              </div>
            </div>
            <div className="profile-field">
              <Phone size={15} color="var(--color-text-muted)" />
              <div>
                <div className="profile-field-label">Phone</div>
                <div className="profile-field-value">{user?.phone || 'Not set'}</div>
              </div>
            </div>
            <div className="profile-field">
              <Shield size={15} color="var(--color-text-muted)" />
              <div>
                <div className="profile-field-label">KYC Status</div>
                <StatusBadge status={user?.kyc_status} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link to="/kyc" className="btn btn-outline btn-full" style={{ justifyContent: 'center' }}>
              Manage KYC Verification
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-padded">
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Account Settings</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Profile editing, password change, and notification preferences will be available in the next release.
            </p>
          </div>
          <div className="card card-padded">
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Security</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
              Two-factor authentication (2FA) and session management coming soon.
            </p>
            <button className="btn btn-danger" onClick={() => { logout(); window.location.href = '/login'; }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .profile-grid { grid-template-columns: 320px 1fr; }
        }

        .profile-card { text-align: center; }

        .profile-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid var(--color-border);
          text-align: left;
        }
        .profile-field:last-child { border-bottom: none; }

        .profile-field-label {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .profile-field-value {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
}
