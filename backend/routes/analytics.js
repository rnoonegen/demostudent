const express = require('express');
const { store } = require('../data/store');

const router = express.Router();

router.get('/student/:studentId', (req, res) => {
  const insight = store.insights[req.params.studentId];
  const student = store.students.find((s) => s.id === req.params.studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  if (insight) {
    return res.json({ studentName: student.name, ...insight });
  }

  const scores = student.growthScores;
  const generated = {
    studentName: student.name,
    academic: {
      trend: scores.academic >= 70 ? 'up' : 'flat',
      label: scores.academic >= 70 ? 'improving' : 'developing',
    },
    creativity: {
      trend: scores.creativity >= 75 ? 'up' : 'flat',
      label: scores.creativity >= 75 ? 'strong' : 'developing',
    },
    participation: {
      trend: scores.collaboration < 65 ? 'down' : 'up',
      label: scores.collaboration < 65 ? 'needs support' : 'active',
    },
    suggestion: scores.collaboration < 65
      ? 'Encourage group activities and presentations.'
      : 'Continue nurturing strengths through varied projects.',
  };

  res.json(generated);
});

module.exports = router;
