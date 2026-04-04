import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import MobileNav from './MobileNav.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import useAppStore from '../../store/useAppStore.js';
import useAuthStore from '../../store/useAuthStore.js';
import { getInitials } from '../../utils/helpers.js';

function TopbarUser() {
  const { user } = useAuthStore();
  const initials = getInitials(user?.full_name);
  return (
    <div className="avatar" style={{ cursor: 'default' }} title={user?.full_name}>
      {initials}
    </div>
  );
}

export default function DashboardLayout() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <MobileDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-content">
        <div className="dashboard-topbar">
          <button
            className="topbar-hamburger btn btn-icon btn-ghost"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="topbar-logo-text">Golden Compass</span>
          <TopbarUser />
        </div>

        <main className="dashboard-main">
          <Outlet />
        </main>

        <MobileNav />
      </div>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg-primary);
        }

        .dashboard-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .dashboard-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--topbar-height);
          padding: 0 16px;
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .topbar-logo-text {
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-gold);
        }

        .dashboard-main {
          flex: 1;
          overflow-y: auto;
          padding-bottom: calc(var(--bottomnav-height) + 16px);
        }

        @media (min-width: 1024px) {
          .dashboard-topbar {
            display: none;
          }

          .dashboard-main {
            padding-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
