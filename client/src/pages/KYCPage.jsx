import { FileCheck, Upload, Clock, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../store/useAuthStore.js';
import StatusBadge from '../components/common/StatusBadge.jsx';

const STEPS = [
  { icon: Upload, title: 'Upload ID Document', desc: 'National ID, Passport, or Alien Card', done: true },
  { icon: FileCheck, title: 'Submit Selfie', desc: 'Live photo for liveness check', done: false },
  { icon: CheckCircle2, title: 'Compliance Review', desc: 'Usually completed within 24 hours', done: false },
];

export default function KYCPage() {
  const { user } = useAuthStore();

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FileCheck size={22} color="var(--color-gold)" />
        <div>
          <h1 className="page-title">KYC Verification</h1>
          <p className="page-subtitle">Identity verification required by CMA Kenya regulations</p>
        </div>
      </div>

      <div className="card card-padded" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Verification Status</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              KYC is required before making any investments.
            </p>
          </div>
          <StatusBadge status={user?.kyc_status} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {STEPS.map(({ icon: Icon, title, desc, done }, i) => (
          <div key={title} className={`kyc-step card card-padded${done ? ' done' : ''}`}>
            <div className="kyc-step-num">{i + 1}</div>
            <div className="kyc-step-icon">
              <Icon size={20} color={done ? 'var(--color-success)' : 'var(--color-gold)'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{desc}</div>
            </div>
            {done && <CheckCircle2 size={20} color="var(--color-success)" />}
            {!done && <Clock size={20} color="var(--color-text-muted)" />}
          </div>
        ))}
      </div>

      <div className="card card-padded">
        <div style={{ fontWeight: 600, marginBottom: 12 }}>Full KYC Flow — Coming Soon</div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
          Document upload, liveness detection via camera, and automatic compliance review will be implemented in Task 3.
        </p>
        <button className="btn btn-primary" disabled>Start Verification</button>
      </div>

      <style>{`
        .kyc-step {
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid var(--color-border);
        }
        .kyc-step.done {
          border-color: rgba(34, 197, 94, 0.2);
          background: rgba(34, 197, 94, 0.04);
        }

        .kyc-step-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        .kyc-step-icon {
          width: 40px; height: 40px;
          border-radius: var(--radius-md);
          background: var(--color-bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
