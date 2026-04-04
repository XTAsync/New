export default function StatusBadge({ status, label }) {
  const map = {
    active: 'badge-success',
    approved: 'badge-success',
    completed: 'badge-success',
    pending: 'badge-warning',
    processing: 'badge-warning',
    not_started: 'badge-muted',
    closed: 'badge-muted',
    paused: 'badge-muted',
    rejected: 'badge-error',
    failed: 'badge-error',
    low: 'badge-success',
    medium: 'badge-warning',
    high: 'badge-error',
    investor: 'badge-info',
    admin: 'badge-gold',
    compliance: 'badge-gold',
    auditor: 'badge-gold',
  };

  const displayLabel = label || status?.replace(/_/g, ' ') || '';
  const className = `badge ${map[status] || 'badge-muted'}`;

  return <span className={className}>{displayLabel}</span>;
}
