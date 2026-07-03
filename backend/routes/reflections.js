const express = require('express');
const { store, nextId } = require('../data/store');

const router = express.Router();

router.get('/student/:studentId', (req, res) => {
  const list = store.reflections.filter((r) => r.studentId === req.params.studentId);
  res.json(list);
});

router.post('/', (req, res) => {
  const { studentId, month, improvements, challenge, goal } = req.body;
  if (!studentId) {
    return res.status(400).json({ error: 'studentId is required' });
  }

  const reflection = {
    id: nextId('r', store.reflections),
    studentId,
    month: month || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    improvements: improvements || [],
    challenge: challenge || '',
    goal: goal || '',
  };

  store.reflections.push(reflection);
  res.status(201).json(reflection);
});

module.exports = router;
