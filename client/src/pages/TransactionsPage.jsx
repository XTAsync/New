import { Receipt } from 'lucide-react';
import { DEMO_TRANSACTIONS } from '../services/mockData.js';
import { formatCurrency, formatDateTime } from '../utils/helpers.js';
import StatusBadge from '../components/common/StatusBadge.jsx';

export default function TransactionsPage() {
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Receipt size={22} color="var(--color-gold)" />
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">Your complete transaction history</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 600 }}>All Transactions</span>
          <StatusBadge status="active" label={`${DEMO_TRANSACTIONS.length} records`} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="txn-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Pool</th>
                <th>Type</th>
                <th>Amount</th>
                <th>M-Pesa Ref</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_TRANSACTIONS.map((txn) => (
                <tr key={txn.id}>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                    {formatDateTime(txn.created_at)}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{txn.pool_name}</span>
                  </td>
                  <td>
                    <span className={`badge ${txn.type === 'deposit' ? 'badge-success' : 'badge-info'}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontWeight: 600,
                      color: txn.type === 'deposit' ? 'var(--color-success)' : 'var(--color-text-primary)',
                    }}>
                      {txn.type === 'deposit' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {txn.mpesa_ref || '—'}
                  </td>
                  <td><StatusBadge status={txn.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .txn-table {
          width: 100%;
          border-collapse: collapse;
        }
        .txn-table th {
          padding: 12px 20px;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          border-bottom: 1px solid var(--color-border);
          white-space: nowrap;
        }
        .txn-table td {
          padding: 14px 20px;
          border-bottom: 1px solid var(--color-border);
          vertical-align: middle;
        }
        .txn-table tr:last-child td { border-bottom: none; }
        .txn-table tr:hover td { background: var(--color-bg-hover); }
      `}</style>
    </div>
  );
}
