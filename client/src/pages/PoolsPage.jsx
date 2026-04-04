import { TrendingUp, ArrowRight, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEMO_POOLS } from '../services/mockData.js';
import { formatCurrency, formatPercent, formatNumber } from '../utils/helpers.js';
import StatusBadge from '../components/common/StatusBadge.jsx';

const RISK_COLORS = {
  low: 'var(--color-success)',
  medium: 'var(--color-warning)',
  high: 'var(--color-error)',
};

export default function PoolsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TrendingUp size={22} color="var(--color-gold)" />
          <div>
            <h1 className="page-title">Investment Pools</h1>
            <p className="page-subtitle">Explore regulated investment opportunities</p>
          </div>
        </div>
      </div>

      <div className="pools-grid">
        {DEMO_POOLS.map((pool) => (
          <div key={pool.id} className="pool-card card">
            <div className="pool-card-header">
              <div>
                <div className="pool-name">{pool.name}</div>
                <div className="pool-type">{pool.asset_type.replace(/_/g, ' ')}</div>
              </div>
              <StatusBadge status={pool.status} />
            </div>

            <p className="pool-desc">{pool.description}</p>

            <div className="pool-stats">
              <div className="pool-stat">
                <div className="pool-stat-label">Target Return</div>
                <div className="pool-stat-value" style={{ color: 'var(--color-success)' }}>
                  {formatPercent(pool.target_return)} p.a.
                </div>
              </div>
              <div className="pool-stat">
                <div className="pool-stat-label">Min Investment</div>
                <div className="pool-stat-value">{formatCurrency(pool.min_investment)}</div>
              </div>
              <div className="pool-stat">
                <div className="pool-stat-label">AUM</div>
                <div className="pool-stat-value">{formatCurrency(pool.total_aum)}</div>
              </div>
              <div className="pool-stat">
                <div className="pool-stat-label">Investors</div>
                <div className="pool-stat-value">{formatNumber(pool.investor_count)}</div>
              </div>
            </div>

            <div className="pool-footer">
              <div className="pool-meta">
                <span className="pool-meta-item">
                  <Shield size={12} />
                  Risk: <span style={{ color: RISK_COLORS[pool.risk_level] }}>{pool.risk_level}</span>
                </span>
                <span className="pool-meta-item">
                  <Clock size={12} />
                  {pool.lock_period_days}d lock
                </span>
              </div>
              <Link to={`/pools/${pool.slug}`} className="btn btn-outline btn-sm">
                View Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .pools-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .pools-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1200px) {
          .pools-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .pool-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 22px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pool-card:hover {
          border-color: var(--color-border-gold);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .pool-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .pool-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.3;
        }

        .pool-type {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 3px;
        }

        .pool-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .pool-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .pool-stat-label {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 3px;
        }

        .pool-stat-value {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .pool-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--color-border);
        }

        .pool-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pool-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
