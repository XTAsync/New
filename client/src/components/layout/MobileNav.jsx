import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  Receipt,
  User,
} from 'lucide-react';

const TABS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/pools', icon: TrendingUp, label: 'Pools' },
  { to: '/navigator', icon: Compass, label: 'Navigator' },
  { to: '/transactions', icon: Receipt, label: 'Transactions' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {TABS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mobile-nav-item${isActive ? ' active' : ''}`
          }
        >
          <Icon size={20} strokeWidth={1.75} />
          <span>{label}</span>
        </NavLink>
      ))}

      <style>{`
        .mobile-nav {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
          height: var(--bottomnav-height);
          z-index: 50;
          padding: 0 4px;
          padding-bottom: env(safe-area-inset-bottom);
        }

        @media (min-width: 1024px) {
          .mobile-nav { display: none; }
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          flex: 1;
          color: var(--color-text-muted);
          font-size: 0.6875rem;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 4px;
          border-radius: var(--radius-sm);
          transition: color 0.15s;
        }

        .mobile-nav-item:hover {
          color: var(--color-text-secondary);
        }

        .mobile-nav-item.active {
          color: var(--color-gold);
        }
      `}</style>
    </nav>
  );
}
