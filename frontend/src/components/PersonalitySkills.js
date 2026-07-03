import { StatusBadge } from './UI';

export function SkillFrameworkTable({ skills, compact = false, frameworkType = 'standard' }) {
  if (!skills?.length) return null;

  const isPersonality = frameworkType === 'personality';

  return (
    <div className="skills-table-wrap">
      <table className="skills-table">
        <thead>
          <tr>
            <th>Skill Area</th>
            {!compact && (
              isPersonality ? (
                <>
                  <th>What is observed</th>
                  <th>Assessment examples</th>
                </>
              ) : (
                <>
                  <th>What it means</th>
                  <th>What can be observed</th>
                </>
              )
            )}
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.skillArea}>
              <td className="skill-area">{skill.skillArea}</td>
              {!compact && (
                isPersonality ? (
                  <>
                    <td className="skill-observed">{skill.observed}</td>
                    <td className="skill-examples">{skill.examples}</td>
                  </>
                ) : (
                  <>
                    <td className="skill-meaning">{skill.meaning}</td>
                    <td className="skill-observed">{skill.observed}</td>
                  </>
                )
              )}
              <td><StatusBadge status={skill.level} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkillFrameworkRow({ skill, frameworkType = 'standard', level, comment, levels, onLevelChange, onCommentChange }) {
  const isPersonality = frameworkType === 'personality';

  return (
    <div className="personality-skill-row">
      <div className="personality-skill-info">
        <strong>{skill.skillArea}</strong>
        {isPersonality ? (
          <>
            <span className="skill-observed">{skill.observed}</span>
            <span className="skill-examples">e.g. {skill.examples}</span>
          </>
        ) : (
          <>
            <span className="skill-meaning">{skill.meaning}</span>
            <span className="skill-observed">Observed: {skill.observed}</span>
          </>
        )}
      </div>
      <select value={level} onChange={(e) => onLevelChange(e.target.value)}>
        {levels.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Comment..."
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
      />
    </div>
  );
}

// Backward-compatible exports
export const PersonalitySkillsTable = SkillFrameworkTable;
export const PersonalitySkillRow = SkillFrameworkRow;
