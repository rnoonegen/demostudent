const express = require('express');
const { store } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const { classId } = req.query;
  let list = store.students;
  if (classId) {
    list = list.filter((s) => s.classId === classId);
  }
  res.json(list.map(({ id, name, avatar, classId: cid, growthScores }) => ({
    id,
    name,
    avatar,
    classId: cid,
    growthScores,
  })));
});

router.get('/:id', (req, res) => {
  const student = store.students.find((s) => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

router.get('/:id/parent-view', (req, res) => {
  const student = store.students.find((s) => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json({
    studentName: student.name,
    highlights: student.parentHighlights,
    currentFocus: student.parentFocus,
    growthScores: student.growthScores,
    personalitySkills: student.personalitySkills,
    emotionalIntelligenceSkills: student.emotionalIntelligenceSkills,
    physicalDevelopmentSkills: student.physicalDevelopmentSkills,
  });
});

module.exports = router;
