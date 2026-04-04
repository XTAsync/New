import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { DEMO_POOLS } from '../services/mockData.js';
import { formatCurrency, formatPercent, formatNumber } from '../utils/helpers.js';
import StatusBadge from '../components/common/StatusBadge.jsx';

export default function PoolDetailPage() {
  const { slug } = useParams();
  const pool = DEMO_POOLS.find((p) => p.slug === slug);

  if (!pool) return <Navigate to="/pools" replace />;

  return (
    <div className="page-container">
      <Link to="/pools" className="back-link">
        <ArrowLeft size={16} />
        Back to Pools
      </Link>

      <div className="pool-detail-header card card-padded" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <TrendingUp size={24} color="var(--color-gold)" />
              <h1 className="page-title" style={{ margin: 0 }}>{pool.name}</h1>
            </div>
            <p className="page-subtitle">{pool.description}</p>
          </div>
          <StatusBadge status={pool.status} />
        </div>
      </div>

      <div className="pool-detail-grid">
        <div className="card card-padded">
          <div className="section-title" style={{ marginBottom: 18, fontWeight: 600 }}>Key Metrics</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Target Annual Return', value: formatPercent(pool.target_return), color: 'var(--color-success)' },
              { label: 'Minimum Investment', value: formatCurrency(pool.min_investment) },
              { label: 'Maximum Investment', value: formatCurrency(pool.max_investment) },
              { label: 'Total AUM', value: formatCurrency(pool.total_aum) },
              { label: 'Total Investors', value: formatNumber(pool.investor_count) },
              { label: 'Lock Period', value: `${pool.lock_period_days} days` },
              { label: 'Currency', value: pool.currency },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 600, color: color || 'var(--color-text-primary)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-padded">
            <div className="section-title" style={{ marginBottom: 12, fontWeight: 600 }}>Risk Profile</div>
            <div style={{ display: 'flex', align: 'center', gap: 10 }}>
              <Shield size={18} color="var(--color-gold)" />
              <span>Risk Level: </span>
              <StatusBadge status={pool.risk_level} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 12, lineHeight: 1.6 }}>
              This pool carries a <strong>{pool.risk_level}</strong> risk profile. Returns are target figures and not guaranteed. Past performance does not indicate future results.
            </p>
          </div>

          <div className="card card-padded">
            <div className="section-title" style={{ marginBottom: 16, fontWeight: 600 }}>Invest Now</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              M-Pesa deposits and withdrawals will be available in the next release.
            </p>
            <button className="btn btn-primary btn-full" disabled>
              Coming Soon — M-Pesa Integration
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          transition: color 0.15s;
        }
        .back-link:hover { color: var(--color-gold); }

        .pool-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        @media (min-width: 768px) {
          .pool-detail-grid { grid-template-columns: 1fr 1fr; }
        }

        .section-title { font-size: 1rem; color: var(--color-text-primary); }
      `}</style>
    </div>
  );
}
