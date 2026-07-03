require('dotenv').config();
const express = require('express');
const cors = require('cors');

const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/students');
const assessmentsRouter = require('./routes/assessments');
const reflectionsRouter = require('./routes/reflections');
const portfolioRouter = require('./routes/portfolio');
const analyticsRouter = require('./routes/analytics');
const {
  GROWTH_LEVELS,
  GROWTH_DIMENSIONS,
  ASSESSMENT_CATEGORIES,
  PERSONALITY_DEVELOPMENT_SKILLS,
  EMOTIONAL_INTELLIGENCE_SKILLS,
  PHYSICAL_DEVELOPMENT_SKILLS,
  ROLES,
} = require('./data/constants');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Student Growth Platform API' });
});

app.get('/api/meta', (req, res) => {
  res.json({
    roles: ROLES,
    growthLevels: GROWTH_LEVELS,
    growthDimensions: GROWTH_DIMENSIONS,
    assessmentCategories: ASSESSMENT_CATEGORIES,
    personalityDevelopmentSkills: PERSONALITY_DEVELOPMENT_SKILLS,
    emotionalIntelligenceSkills: EMOTIONAL_INTELLIGENCE_SKILLS,
    physicalDevelopmentSkills: PHYSICAL_DEVELOPMENT_SKILLS,
  });
});

app.use('/api/classes', classesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/reflections', reflectionsRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/analytics', analyticsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT in .env`);
  } else {
    console.error('Server failed to start:', err.message);
  }
  process.exit(1);
});
