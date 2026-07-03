export const GROWTH_LEVELS = ['Beginner', 'Developing', 'Proficient', 'Advanced'];

export const PERSONALITY_DEVELOPMENT_SKILLS = [
  { skillArea: 'Self-confidence', observed: 'Belief in own abilities', examples: 'Speaks up, tries new tasks, accepts challenges' },
  { skillArea: 'Communication skills', observed: 'Expressing thoughts clearly', examples: 'Speaking, listening, presenting ideas' },
  { skillArea: 'Emotional awareness', observed: 'Understanding and managing emotions', examples: 'Handles frustration, responds calmly' },
  { skillArea: 'Self-discipline', observed: 'Managing actions and time', examples: 'Completes tasks, follows routines' },
  { skillArea: 'Leadership', observed: 'Taking initiative and responsibility', examples: 'Guides groups, makes decisions' },
  { skillArea: 'Teamwork', observed: 'Working with others', examples: 'Cooperation, respect, helping peers' },
  { skillArea: 'Creativity', observed: 'Generating new ideas', examples: 'Innovation, imagination, problem solving' },
  { skillArea: 'Adaptability', observed: 'Handling change', examples: 'Learns from mistakes, adjusts to situations' },
  { skillArea: 'Empathy', observed: 'Understanding others', examples: 'Kindness, respect, supporting classmates' },
  { skillArea: 'Critical thinking', observed: 'Independent thinking', examples: 'Questions, analyzes, makes decisions' },
  { skillArea: 'Resilience', observed: 'Recovering from difficulties', examples: 'Persistence, learning from failure' },
  { skillArea: 'Goal setting', observed: 'Planning improvement', examples: 'Sets goals and tracks progress' },
];

export const EMOTIONAL_INTELLIGENCE_SKILLS = [
  { skillArea: 'Self-awareness', meaning: 'Understanding own emotions, strengths, and weaknesses', observed: 'Identifies feelings, knows personal strengths, reflects on actions' },
  { skillArea: 'Emotional regulation', meaning: 'Managing emotions and reactions', observed: 'Handles anger, stress, disappointment, and pressure appropriately' },
  { skillArea: 'Empathy', meaning: "Understanding others' feelings", observed: 'Shows care, listens, respects different perspectives' },
  { skillArea: 'Social awareness', meaning: 'Understanding social situations', observed: "Notices others' needs, behaves appropriately in groups" },
  { skillArea: 'Relationship skills', meaning: 'Building positive relationships', observed: 'Communicates, resolves conflicts, cooperates' },
  { skillArea: 'Self-motivation', meaning: 'Using emotions to achieve goals', observed: 'Shows persistence, enthusiasm, responsibility' },
  { skillArea: 'Decision-making', meaning: 'Making thoughtful choices', observed: 'Considers consequences before acting' },
  { skillArea: 'Conflict management', meaning: 'Handling disagreements', observed: 'Negotiates, forgives, finds solutions' },
  { skillArea: 'Adaptability', meaning: 'Adjusting emotionally to change', observed: 'Accepts feedback, handles new situations' },
  { skillArea: 'Mindfulness/Reflection', meaning: 'Observing thoughts and feelings', observed: 'Reflects on experiences and improves behavior' },
];

export const PHYSICAL_DEVELOPMENT_SKILLS = [
  { skillArea: 'Physical fitness', meaning: 'Strength, stamina, flexibility, endurance', observed: 'Participation in exercise, sports performance, energy levels' },
  { skillArea: 'Motor skills', meaning: 'Body coordination and control', observed: 'Balance, movement, agility, hand-eye coordination' },
  { skillArea: 'Health awareness', meaning: 'Understanding healthy living', observed: 'Nutrition, hygiene, sleep habits, personal care' },
  { skillArea: 'Sportsmanship', meaning: 'Positive attitude in physical activities', observed: 'Team spirit, fairness, respect for rules' },
  { skillArea: 'Body awareness', meaning: 'Understanding physical abilities and limits', observed: 'Safe movement, posture, listening to body signals' },
  { skillArea: 'Discipline & routine', meaning: 'Maintaining healthy habits', observed: 'Regular practice, attendance, preparation' },
  { skillArea: 'Outdoor participation', meaning: 'Engagement with physical activities', observed: 'Games, athletics, yoga, fitness activities' },
  { skillArea: 'Confidence in movement', meaning: 'Comfort with physical expression', observed: 'Trying new activities, participation without fear' },
  { skillArea: 'Safety awareness', meaning: 'Preventing injuries', observed: 'Uses equipment properly, follows safety guidelines' },
  { skillArea: 'Wellbeing habits', meaning: 'Balance between activity and rest', observed: 'Stress management, relaxation practices' },
];

export const ASSESSMENT_FRAMEWORK = {
  categories: {
    academic: {
      label: 'Academic',
      traits: ['Subject Understanding', 'Problem Solving', 'Application of Knowledge'],
    },
    personalityDevelopment: {
      label: 'Personality Development Skills',
      traits: PERSONALITY_DEVELOPMENT_SKILLS.map((s) => s.skillArea),
      skills: PERSONALITY_DEVELOPMENT_SKILLS,
      frameworkType: 'personality',
    },
    emotionalIntelligence: {
      label: 'Emotional Intelligence Skills',
      traits: EMOTIONAL_INTELLIGENCE_SKILLS.map((s) => s.skillArea),
      skills: EMOTIONAL_INTELLIGENCE_SKILLS,
      frameworkType: 'standard',
    },
    physicalDevelopment: {
      label: 'Physical Development Skills',
      traits: PHYSICAL_DEVELOPMENT_SKILLS.map((s) => s.skillArea),
      skills: PHYSICAL_DEVELOPMENT_SKILLS,
      frameworkType: 'standard',
    },
  },
  levels: GROWTH_LEVELS,
};
