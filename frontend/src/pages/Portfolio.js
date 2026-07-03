import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader, Card, LoadingState, ErrorState } from '../components/UI';

export default function Portfolio() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getStudent(id), api.getPortfolio(id)])
      .then(([s, portfolio]) => {
        setStudent(s);
        setItems(portfolio);
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <ErrorState message={error} />;
  if (!student) return <LoadingState />;

  const months = [...new Set(items.map((i) => i.month))].reverse();
  const timeline = months.length ? months.join(' → ') : 'No entries yet';

  return (
    <div className="page portfolio">
      <PageHeader
        title="My Learning Journey"
        subtitle={`${student.name}'s digital learning diary`}
      />

      <Card className="timeline-card">
        <h2>Growth Timeline</h2>
        <p className="timeline">{timeline}</p>
      </Card>

      <div className="portfolio-grid">
        {items.map((item) => (
          <Card key={item.id} className="portfolio-item">
            <span className="portfolio-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p className="portfolio-meta">{item.month} · {item.type}</p>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card>
          <p>No portfolio items yet. Start documenting learning moments!</p>
        </Card>
      )}
    </div>
  );
}
