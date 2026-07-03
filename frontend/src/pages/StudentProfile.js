import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { StatusBadge, PageHeader, Card, LoadingState, ErrorState, GrowthBar } from '../components/UI';

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getStudent(id)
      .then(setStudent)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <ErrorState message={error} />;
  if (!student) return <LoadingState />;

  return (
    <div className="page student-profile">
      <PageHeader
        title={student.name}
        subtitle={`Class ${student.classId} · Holistic Student Profile`}
        actions={
          <>
            <Link to={`/assess/${id}`} className="btn btn-primary">Assess Student</Link>
            <Link to={`/portfolio/${id}`} className="btn btn-secondary">Portfolio</Link>
          </>
        }
      />

      <div className="profile-grid">
        <Card>
          <h2>Academic</h2>
          <ul className="check-list">
            {student.academic.map((a) => (
              <li key={a.subject}>
                <span className="check">✓</span>
                {a.subject}: <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2>Growth Dimensions</h2>
          {Object.entries(student.growthScores).map(([key, val]) => (
            <GrowthBar
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={val}
            />
          ))}
        </Card>

        <Card className="assess-prompt-card">
          <h2>Holistic Assessment</h2>
          <p className="card-desc">
            Personality Development, Emotional Intelligence, and Physical Development
            skills are recorded on the Assess Student screen.
          </p>
          <Link to={`/assess/${id}`} className="btn btn-primary">Go to Assess Student →</Link>
        </Card>

        <Card className="notes-card">
          <h2>Teacher Notes</h2>
          <p className="teacher-note">&ldquo;{student.teacherNotes}&rdquo;</p>
        </Card>

        <Card>
          <h2>Portfolio Preview</h2>
          <div className="portfolio-preview">
            <span>📄 Project</span>
            <span>🎨 Artwork</span>
            <span>🎤 Presentation</span>
          </div>
          <Link to={`/portfolio/${id}`} className="link-more">View full portfolio →</Link>
        </Card>
      </div>
    </div>
  );
}
