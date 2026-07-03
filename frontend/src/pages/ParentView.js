import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader, Card, GrowthBar, LoadingState, ErrorState } from '../components/UI';

export default function ParentView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getParentView(id)
      .then(setData)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState />;

  return (
    <div className="page parent-view">
      <PageHeader
        title={`${data.studentName}'s Development`}
        subtitle="Growth-focused view for parents"
      />

      <Card className="parent-highlights">
        <h2>Your child is developing</h2>
        <ul className="highlight-list">
          {data.highlights.map((h) => (
            <li key={h}><span className="check">✓</span> {h}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2>Current focus</h2>
        <p className="focus-text">{data.currentFocus}</p>
      </Card>

      <Card>
        <h2>Growth overview</h2>
        {Object.entries(data.growthScores).map(([key, val]) => (
          <GrowthBar
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={val}
          />
        ))}
      </Card>
    </div>
  );
}
