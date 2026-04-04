import { LayoutDashboard, TrendingUp, ArrowUpRight } from 'lucide-react';
import useAuthStore from '../store/useAuthStore.js';
import {
  DEMO_PORTFOLIO,
  DEMO_CHART_DATA,
  DEMO_POOLS,
  DEMO_TRANSACTIONS,
} from '../services/mockData.js';
import { formatCurrency, formatPercent, formatRelativeTime } from '../utils/helpers.js';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import StatusBadge from '../components/common/StatusBadge.jsx';

function StatCard({ label, value, sub, positive }) {
  return (
    <div className="stat-card card card-padded">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && (
        <div className={`stat-sub ${positive ? 'text-success' : ''}`}>{sub}</div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user, isDemoMode } = useAuthStore();
  const portfolio = DEMO_PORTFOLIO;

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LayoutDashboard size={22} color="var(--color-gold)" />
          <div>
            <h1 className="page-title">Welcome back, {user?.full_name?.split(' ')[0]}</h1>
            <p className="page-subtitle">Here's your investment summary</p>
          </div>
        </div>
        {isDemoMode && (
          <div className="demo-banner">
            Demo Mode — data is illustrative only
          </div>
        )}
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total Portfolio Value"
          value={formatCurrency(portfolio.total_value)}
          sub={`+${formatPercent(portfolio.return_percent)} all time`}
          positive
        />
        <StatCard
          label="Total Invested"
          value={formatCurrency(portfolio.total_invested)}
        />
        <StatCard
          label="Total Returns"
          value={formatCurrency(portfolio.total_returns)}
          sub={`+${formatCurrency(portfolio.total_returns)} gain`}
          positive
        />
        <StatCard
          label="Active Pools"
          value={portfolio.positions.length}
          sub="positions"
        />
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{ padding: 24 }}>
          <div className="section-header">
            <div className="section-title">Portfolio Growth</div>
          </div>
          <div style={{ height: 220, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMO_CHART_DATA}>
                <defs>
                  <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A843" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D4A843" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    color: 'var(--color-text-primary)',
                    fontSize: 13,
                  }}
                  formatter={(v) => [formatCurrency(v), 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#D4A843"
                  strokeWidth={2.5}
                  fill="url(#gold-grad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div className="section-header">
            <div className="section-title">Your Positions</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {portfolio.positions.map((pos) => (
              <div key={pos.pool_id} className="position-row">
                <div>
                  <div className="position-name">{pos.pool_name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                    {pos.units} units · Cost: {formatCurrency(pos.invested)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600 }}>{formatCurrency(pos.current_value)}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: 2 }}>
                    +{formatPercent(pos.return_percent)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 24 }}>
        <div className="section-header">
          <div className="section-title">Recent Transactions</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 12 }}>
          {DEMO_TRANSACTIONS.slice(0, 3).map((txn) => (
            <div key={txn.id} className="txn-row">
              <div>
                <div className="txn-name">{txn.pool_name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {formatRelativeTime(txn.created_at)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <StatusBadge status={txn.status} />
                <span style={{
                  fontWeight: 600,
                  color: txn.type === 'deposit' ? 'var(--color-success)' : 'var(--color-text-primary)',
                }}>
                  {txn.type === 'deposit' ? '+' : '-'}{formatCurrency(txn.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .demo-banner {
          background: var(--color-gold-muted);
          border: 1px solid var(--color-border-gold);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          font-size: 0.8125rem;
          color: var(--color-gold);
          margin-top: 12px;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .stat-card {
          background: var(--color-bg-secondary);
        }

        .stat-label {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.2;
        }

        .stat-sub {
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }

        .text-success { color: var(--color-success) !important; }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .dashboard-grid { grid-template-columns: 1.5fr 1fr; }
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .position-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .position-row:last-child { border-bottom: none; }

        .position-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .txn-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .txn-row:last-child { border-bottom: none; }

        .txn-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
}
