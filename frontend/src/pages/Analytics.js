import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader, Card, TrendIcon, LoadingState, ErrorState } from '../components/UI';

export default function Analytics() {
  const { id } = useParams();
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getAnalytics(id)
      .then(setInsight)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <ErrorState message={error} />;
  if (!insight) return <LoadingState />;

  const metrics = [
    { key: 'academic', label: 'Academic' },
    { key: 'creativity', label: 'Creativity' },
    { key: 'participation', label: 'Participation' },
  ];

  return (
    <div className="page analytics">
      <PageHeader
        title="Student Growth Insight"
        subtitle={`AI-assisted patterns for ${insight.studentName}`}
      />

      <Card className="insight-card">
        <div className="insight-metrics">
          {metrics.map(({ key, label }) => (
            <div key={key} className="insight-row">
              <span>{label}:</span>
              <TrendIcon trend={insight[key].trend} />
              <span className="insight-label">{insight[key].label}</span>
            </div>
          ))}
        </div>

        <div className="suggestion-box">
          <h3>Suggestion</h3>
          <p>{insight.suggestion}</p>
        </div>
      </Card>

      <Card>
        <h2>About Growth Analytics</h2>
        <p className="card-desc">
          This module identifies patterns across academic progress, creative expression,
          and classroom participation — helping teachers support each student&apos;s unique journey.
        </p>
      </Card>
    </div>
  );
}
