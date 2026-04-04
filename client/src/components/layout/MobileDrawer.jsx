import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  Receipt,
  User,
  Shield,
  LogOut,
  X,
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

export default function MobileDrawer({ open, onClose }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user && ADMIN_ROLES.includes(user.role);

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const handleNavClick = () => onClose();

  return (
    <>
      <div
        className={`drawer-overlay${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="drawer-header">
          <div className="drawer-logo">
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="var(--color-gold)" strokeWidth="2.5" fill="none" />
              <circle cx="32" cy="32" r="4" fill="var(--color-gold)" />
              <polygon points="32,8 29,30 35,30" fill="var(--color-gold)" />
              <polygon points="32,56 29,34 35,34" fill="var(--color-text-muted)" />
              <polygon points="56,32 34,29 34,35" fill="var(--color-text-muted)" />
              <polygon points="8,32 30,29 30,35" fill="var(--color-gold)" />
            </svg>
            <span className="drawer-logo-text">Golden Compass</span>
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-user">
          <div className="avatar avatar-lg">
            {getInitials(user?.full_name)}
          </div>
          <div>
            <div className="drawer-user-name">{user?.full_name}</div>
            <StatusBadge status={user?.role} />
          </div>
        </div>

        <nav className="drawer-nav">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `drawer-nav-item${isActive ? ' active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
          {isAdmin && (
            <>
              <div className="divider" />
              <NavLink
                to="/admin"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `drawer-nav-item${isActive ? ' active' : ''}`
                }
              >
                <Shield size={18} />
                <span>Admin Panel</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="drawer-footer">
          <button className="btn btn-ghost btn-full drawer-logout" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      <style>{`
        .drawer-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 60;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .drawer-overlay.open {
          display: block;
          opacity: 1;
        }

        .drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          z-index: 70;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .drawer.open {
          transform: translateX(0);
        }

        @media (min-width: 1024px) {
          .drawer, .drawer-overlay { display: none !important; }
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .drawer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .drawer-logo-text {
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-gold);
        }

        .drawer-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .drawer-user-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }

        .drawer-nav {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .drawer-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: all 0.15s;
        }

        .drawer-nav-item:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-hover);
        }

        .drawer-nav-item.active {
          color: var(--color-gold);
          background: var(--color-gold-muted);
          font-weight: 600;
        }

        .drawer-footer {
          padding: 16px;
          border-top: 1px solid var(--color-border);
        }

        .drawer-logout {
          color: var(--color-text-secondary);
          gap: 8px;
          justify-content: flex-start;
          font-size: 0.9375rem;
        }
        .drawer-logout:hover {
          color: var(--color-error);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </>
  );
}
