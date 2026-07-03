export function GrowthBar({ label, value, color = 'var(--accent)' }) {
  return (
    <div className="growth-bar">
      <div className="growth-bar-header">
        <span>{label}</span>
        <span className="growth-bar-value">{value}%</span>
      </div>
      <div className="growth-bar-track">
        <div
          className="growth-bar-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function StarRating({ value, max = 5 }) {
  return (
    <span className="star-rating">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </span>
  );
}

export function StatusBadge({ status }) {
  const cls = status.toLowerCase().replace(/\s+/g, '-');
  return <span className={`badge badge-${cls}`}>{status}</span>;
}

export function TrendIcon({ trend }) {
  if (trend === 'up') return <span className="trend trend-up">↑</span>;
  if (trend === 'down') return <span className="trend trend-down">↓</span>;
  return <span className="trend trend-flat">→</span>;
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function LoadingState() {
  return <div className="loading-state">Loading...</div>;
}

export function ErrorState({ message }) {
  return <div className="error-state">{message}</div>;
}
