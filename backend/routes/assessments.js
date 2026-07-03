const express = require('express');
const { store, nextId } = require('../data/store');
const {
  ASSESSMENT_CATEGORIES,
  GROWTH_LEVELS,
  SKILL_FIELD_MAP,
  levelToScore,
  buildSkillSet,
} = require('../data/constants');

const router = express.Router();

router.get('/framework', (req, res) => {
  res.json({
    categories: ASSESSMENT_CATEGORIES,
    levels: GROWTH_LEVELS,
  });
});

router.get('/student/:studentId', (req, res) => {
  const list = store.assessments.filter((a) => a.studentId === req.params.studentId);
  res.json(list);
});

router.post('/', (req, res) => {
  const { studentId, categories, teacherId = 't1' } = req.body;
  if (!studentId || !categories) {
    return res.status(400).json({ error: 'studentId and categories are required' });
  }

  const student = store.students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const assessment = {
    id: nextId('a', store.assessments),
    studentId,
    teacherId,
    date: new Date().toISOString().split('T')[0],
    categories,
  };

  store.assessments.push(assessment);
  updateStudentGrowthFromAssessment(student, categories);

  res.status(201).json(assessment);
});

function syncSkillCategory(student, categoryKey, categoryData) {
  const config = SKILL_FIELD_MAP[categoryKey];
  if (!config || !categoryData) return;

  const levelMap = {};
  Object.entries(categoryData).forEach(([skill, { level }]) => {
    levelMap[skill] = level;
  });

  const existing = student[config.field] || [];
  student[config.field] = buildSkillSet(config.framework, {
    ...Object.fromEntries(existing.map((s) => [s.skillArea, s.level])),
    ...levelMap,
  });
}

function updateStudentGrowthFromAssessment(student, categories) {
  const allLevels = [];
  Object.values(categories).forEach((traits) => {
    Object.values(traits).forEach(({ level }) => {
      if (GROWTH_LEVELS.includes(level)) allLevels.push(levelToScore(level));
    });
  });
  if (allLevels.length > 0) {
    const avg = Math.round(allLevels.reduce((a, b) => a + b, 0) / allLevels.length);
    student.growthScores.academic = Math.min(100, Math.round((student.growthScores.academic + avg) / 2));
  }

  if (categories.emotionalIntelligence) {
    const eiAvg = averageLevelScore(categories.emotionalIntelligence);
    if (eiAvg) student.growthScores.emotional = Math.min(100, Math.round((student.growthScores.emotional + eiAvg) / 2));
  }
  if (categories.physicalDevelopment) {
    const pdAvg = averageLevelScore(categories.physicalDevelopment);
    if (pdAvg) student.growthScores.physical = Math.min(100, Math.round((student.growthScores.physical + pdAvg) / 2));
  }

  Object.keys(SKILL_FIELD_MAP).forEach((key) => syncSkillCategory(student, key, categories[key]));
}

function averageLevelScore(categoryData) {
  const scores = Object.values(categoryData)
    .map(({ level }) => levelToScore[level])
    .filter(Boolean);
  if (!scores.length) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

module.exports = router;
