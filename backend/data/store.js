const seed = require('./seedData');

const store = {
  classOverview: { ...seed.classOverview },
  students: seed.students.map((s) => ({ ...s })),
  assessments: seed.assessments.map((a) => ({ ...a, categories: JSON.parse(JSON.stringify(a.categories)) })),
  reflections: seed.reflections.map((r) => ({ ...r })),
  portfolioItems: seed.portfolioItems.map((p) => ({ ...p })),
  insights: { ...seed.insights },
};

const nextId = (prefix, items) => {
  const nums = items
    .map((item) => parseInt(item.id.replace(prefix, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `${prefix}${max + 1}`;
};

module.exports = { store, nextId };
