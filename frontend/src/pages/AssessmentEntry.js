import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ASSESSMENT_FRAMEWORK } from '../data/assessmentFramework';
import { PageHeader, Card, LoadingState, ErrorState } from '../components/UI';
import { SkillFrameworkRow } from '../components/PersonalitySkills';

const emptyTrait = () => ({ level: 'Developing', comment: '' });

export default function AssessmentEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const framework = ASSESSMENT_FRAMEWORK;

  useEffect(() => {
    const initial = {};
    Object.entries(framework.categories).forEach(([catKey, cat]) => {
      initial[catKey] = {};
      cat.traits.forEach((trait) => {
        initial[catKey][trait] = emptyTrait();
      });
    });
    setForm(initial);

    api.getStudent(id)
      .then(setStudent)
      .catch((e) => setError(e.message));
  }, [id]);

  const updateTrait = (category, trait, field, value) => {
    setForm((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [trait]: { ...prev[category][trait], [field]: value },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.submitAssessment({ studentId: id, categories: form });
      navigate(`/students/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error && !student) return <ErrorState message={error} />;
  if (!student) return <LoadingState />;

  return (
    <div className="page assessment-entry">
      <PageHeader
        title="Assess Student"
        subtitle={`Recording holistic growth for ${student.name}`}
      />

      <form onSubmit={handleSubmit}>
        {Object.entries(framework.categories).map(([catKey, cat]) => (
          <Card key={catKey} className="assessment-category">
            <h2>{cat.label}</h2>
            {cat.skills ? (
              <div className="personality-assessment-list">
                {cat.skills.map((skill) => (
                  <SkillFrameworkRow
                    key={skill.skillArea}
                    skill={skill}
                    frameworkType={cat.frameworkType || 'standard'}
                    level={form[catKey]?.[skill.skillArea]?.level || 'Developing'}
                    comment={form[catKey]?.[skill.skillArea]?.comment || ''}
                    levels={framework.levels}
                    onLevelChange={(val) => updateTrait(catKey, skill.skillArea, 'level', val)}
                    onCommentChange={(val) => updateTrait(catKey, skill.skillArea, 'comment', val)}
                  />
                ))}
              </div>
            ) : (
              cat.traits.map((trait) => (
                <div key={trait} className="trait-row">
                  <label className="trait-label">{trait}</label>
                  <select
                    value={form[catKey]?.[trait]?.level || 'Developing'}
                    onChange={(e) => updateTrait(catKey, trait, 'level', e.target.value)}
                  >
                    {framework.levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Comment..."
                    value={form[catKey]?.[trait]?.comment || ''}
                    onChange={(e) => updateTrait(catKey, trait, 'comment', e.target.value)}
                  />
                </div>
              ))
            )}
          </Card>
        ))}

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
}
