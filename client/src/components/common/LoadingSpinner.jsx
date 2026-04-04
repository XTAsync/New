export default function LoadingSpinner({ size = 'md', label }) {
  const sizeClass = size === 'lg' ? 'spinner spinner-lg' : 'spinner';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div className={sizeClass} />
      {label && (
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {label}
        </span>
      )}
    </div>
  );
}
