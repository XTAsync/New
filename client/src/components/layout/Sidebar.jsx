import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  Receipt,
  User,
  Shield,
  LogOut,
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore.js';
import { getInitials } from '../../utils/helpers.js';
import StatusBadge from '../common/StatusBadge.jsx';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pools', icon: TrendingUp, label: 'Pools' },
  { to: '/navigator', icon: Compass, label: 'Navigator' },
  { to: '/transactions', icon: Receipt, label: 'Transactions' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const ADMIN_ROLES = ['admin', 'compliance', 'auditor'];

function CompassIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 64 64"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="32" cy="32" r="30" stroke="var(--color-gold)" strokeWidth="2.5" fill="none" />
      <circle cx="32" cy="32" r="4" fill="var(--color-gold)" />
      <polygon points="32,8 29,30 35,30" fill="var(--color-gold)" />
      <polygon points="32,56 29,34 35,34" fill="var(--color-text-muted)" />
      <polygon points="56,32 34,29 34,35" fill="var(--color-text-muted)" />
      <polygon points="8,32 30,29 30,35" fill="var(--color-gold)" />
    </svg>
  );
}

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user && ADMIN_ROLES.includes(user.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <CompassIcon />
        </div>
        <div>
          <div className="sidebar-logo-title">Golden Compass</div>
          <div className="sidebar-logo-sub">Investment Platform</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? ' active' : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `sidebar-nav-item sidebar-nav-admin${isActive ? ' active' : ''}`
            }
          >
            <Shield size={18} />
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar avatar-lg">
            {getInitials(user?.full_name)}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.full_name}</div>
            <StatusBadge status={user?.role} />
          </div>
        </div>
        <button className="btn btn-ghost btn-icon sidebar-logout" onClick={handleLogout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          min-height: 100vh;
          background: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          display: none;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .sidebar { display: flex; }
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .sidebar-logo-icon {
          transition: transform 0.6s ease;
        }
        .sidebar-logo:hover .sidebar-logo-icon {
          transform: rotate(45deg);
        }

        .sidebar-logo-title {
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-gold);
          line-height: 1.2;
        }

        .sidebar-logo-sub {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all 0.15s ease;
          border-left: 3px solid transparent;
          text-decoration: none;
        }

        .sidebar-nav-item:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-hover);
        }

        .sidebar-nav-item.active {
          color: var(--color-gold);
          background: var(--color-gold-muted);
          border-left-color: var(--color-gold);
          font-weight: 600;
        }

        .sidebar-nav-admin {
          margin-top: 8px;
          border-top: 1px solid var(--color-border);
          padding-top: 14px;
        }

        .sidebar-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px;
          border-top: 1px solid var(--color-border);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .sidebar-user-info {
          flex: 1;
          min-width: 0;
        }

        .sidebar-user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 3px;
        }

        .sidebar-logout {
          color: var(--color-text-muted);
          flex-shrink: 0;
        }
        .sidebar-logout:hover {
          color: var(--color-error);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </aside>
  );
}
