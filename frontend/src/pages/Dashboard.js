import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { GrowthBar, PageHeader, Card, LoadingState, ErrorState } from '../components/UI';

const DIMENSION_COLORS = {
  academic: '#4a7c59',
  creativity: '#c17f59',
  collaboration: '#5b7fa6',
  emotional: '#9b6b9e',
  physical: '#6b9e8a',
};

export default function Dashboard() {
  const { role, currentStudent } = useApp();
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role === 'student') {
      api.getStudent(currentStudent.id)
        .then(setStudent)
        .catch((e) => setError(e.message));
      return;
    }
    Promise.all([api.getClassOverview(), api.getStudents('8A')])
      .then(([overview, studentList]) => {
        setData(overview);
        setStudents(studentList);
      })
      .catch((e) => setError(e.message));
  }, [role, currentStudent.id]);

  if (error) return <ErrorState message={error} />;

  if (role === 'student') {
    if (!student) return <LoadingState />;
    return (
      <div className="page dashboard">
        <PageHeader
          title="My Learning Journey"
          subtitle={`Welcome back, ${student.name}`}
          actions={
            <>
              <Link to={`/reflect/${student.id}`} className="btn btn-primary">Self-Reflection</Link>
              <Link to={`/portfolio/${student.id}`} className="btn btn-secondary">Portfolio</Link>
            </>
          }
        />
        <div className="dashboard-grid">
          <Card>
            <h2>My Growth</h2>
            {Object.entries(student.growthScores).map(([key, val]) => (
              <GrowthBar key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
            ))}
          </Card>
          <Card>
            <h2>Academic Progress</h2>
            <ul className="check-list">
              {student.academic.map((a) => (
                <li key={a.subject}><span className="check">✓</span> {a.subject}: <strong>{a.status}</strong></li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) return <LoadingState />;

  return (
    <div className="page dashboard">
      <PageHeader
        title={`${data.name} | Student Growth`}
        subtitle={`${data.studentCount} students · Holistic development overview`}
        actions={
          <>
            <Link to="/assess/s1" className="btn btn-primary">Assess Student</Link>
            <Link to="/reports" className="btn btn-secondary">Reports</Link>
            <Link to="/analytics/s1" className="btn btn-secondary">Insights</Link>
          </>
        }
      />

      <div className="dashboard-grid">
        <Card className="growth-overview">
          <h2>Class Growth Dimensions</h2>
          <p className="card-desc">Overall development across integral education areas</p>
          {data.dimensions.map((dim) => (
            <GrowthBar
              key={dim.id}
              label={dim.label}
              value={data.growthSummary[dim.id]}
              color={DIMENSION_COLORS[dim.id]}
            />
          ))}
        </Card>

        <Card>
          <h2>Students</h2>
          <ul className="student-list">
            {students.map((s) => (
              <li key={s.id}>
                <Link to={`/students/${s.id}`} className="student-list-item">
                  <span className="avatar">{s.avatar}</span>
                  <span className="student-name">{s.name}</span>
                  <span className="student-score">{s.growthScores.academic}% academic</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="philosophy-card">
          <h2>Our Approach</h2>
          <blockquote>
            &ldquo;How is the student growing?&rdquo; — not just &ldquo;What score did they get?&rdquo;
          </blockquote>
          <ul className="module-list">
            <li>Student Profiles</li>
            <li>Assessment Framework</li>
            <li>Portfolio & Reflection</li>
            <li>Growth Analytics</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
