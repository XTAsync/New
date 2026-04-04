import { Compass, Sliders, Target, BarChart2 } from 'lucide-react';

const FEATURES = [
  {
    icon: Target,
    title: 'Goal-Based Planning',
    desc: 'Set financial goals — retirement, education, home — and let Navigator build an optimal allocation strategy.',
  },
  {
    icon: Sliders,
    title: 'Risk Profiler',
    desc: 'Complete a short questionnaire and receive a personalised risk score that guides pool recommendations.',
  },
  {
    icon: BarChart2,
    title: 'Portfolio Optimiser',
    desc: 'ML-powered allocation across available pools to maximise returns within your risk tolerance.',
  },
];

export default function NavigatorPage() {
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Compass size={22} color="var(--color-gold)" />
        <div>
          <h1 className="page-title">Investment Navigator</h1>
          <p className="page-subtitle">AI-powered portfolio guidance</p>
        </div>
      </div>

      <div className="card card-padded coming-soon-card">
        <div className="coming-soon-icon">
          <Compass size={48} color="var(--color-gold)" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Coming in the Next Release
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: 480, lineHeight: 1.6 }}>
          The Navigator will analyse your financial goals, risk appetite, and investment horizon to recommend the optimal pool allocation. Powered by OpenAI.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="feature-card card card-padded">
            <div className="feature-icon">
              <Icon size={22} color="var(--color-gold)" />
            </div>
            <div className="feature-title">{title}</div>
            <div className="feature-desc">{desc}</div>
          </div>
        ))}
      </div>

      <style>{`
        .coming-soon-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 32px;
          margin-bottom: 24px;
        }

        .coming-soon-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: var(--color-gold-muted);
          border: 2px solid var(--color-border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .features-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .feature-card { display: flex; flex-direction: column; gap: 10px; }

        .feature-icon {
          width: 44px; height: 44px;
          background: var(--color-gold-muted);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .feature-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}
