import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { PageHeader, Card, LoadingState, ErrorState } from '../components/UI';

const IMPROVEMENT_OPTIONS = [
  'Self-confidence',
  'Communication skills',
  'Emotional awareness',
  'Self-discipline',
  'Leadership',
  'Teamwork',
  'Creativity',
  'Adaptability',
  'Empathy',
  'Critical thinking',
  'Resilience',
  'Goal setting',
];

export default function SelfReflection() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [existing, setExisting] = useState(null);
  const [improvements, setImprovements] = useState([]);
  const [challenge, setChallenge] = useState('');
  const [goal, setGoal] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getStudent(id), api.getReflections(id)])
      .then(([s, refs]) => {
        setStudent(s);
        if (refs.length > 0) {
          const latest = refs[refs.length - 1];
          setExisting(latest);
          setImprovements(latest.improvements);
          setChallenge(latest.challenge);
          setGoal(latest.goal);
        }
      })
      .catch((e) => setError(e.message));
  }, [id]);

  const toggleImprovement = (item) => {
    setImprovements((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitReflection({ studentId: id, improvements, challenge, goal });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error && !student) return <ErrorState message={error} />;
  if (!student) return <LoadingState />;

  return (
    <div className="page self-reflection">
      <PageHeader
        title="Self-Reflection"
        subtitle={`${student.name} · This month's growth journey`}
      />

      <form onSubmit={handleSubmit}>
        <Card>
          <h2>This month I improved in:</h2>
          <div className="checkbox-grid">
            {IMPROVEMENT_OPTIONS.map((opt) => (
              <label key={opt} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={improvements.includes(opt)}
                  onChange={() => toggleImprovement(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <h2>My challenge</h2>
          <textarea
            rows={3}
            placeholder="What was difficult this month?"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
          />
        </Card>

        <Card>
          <h2>My goal</h2>
          <textarea
            rows={3}
            placeholder="What do I want to achieve next?"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </Card>

        {existing && (
          <p className="hint">Last saved: {existing.month}</p>
        )}

        {saved && <p className="success-msg">Reflection saved successfully!</p>}
        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-primary">Save Reflection</button>
      </form>
    </div>
  );
}
