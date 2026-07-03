const express = require('express');
const { store, nextId } = require('../data/store');

const router = express.Router();

const ICONS = {
  project: '📄',
  artwork: '🎨',
  presentation: '🎤',
  reflection: '📝',
  video: '🎥',
  photo: '📷',
};

router.get('/student/:studentId', (req, res) => {
  const items = store.portfolioItems
    .filter((p) => p.studentId === req.params.studentId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(items);
});

router.post('/', (req, res) => {
  const { studentId, type, title } = req.body;
  if (!studentId || !title) {
    return res.status(400).json({ error: 'studentId and title are required' });
  }

  const now = new Date();
  const item = {
    id: nextId('p', store.portfolioItems),
    studentId,
    type: type || 'project',
    title,
    icon: ICONS[type] || '📄',
    date: now.toISOString().split('T')[0],
    month: now.toLocaleString('default', { month: 'long' }),
  };

  store.portfolioItems.push(item);
  res.status(201).json(item);
});

module.exports = router;
