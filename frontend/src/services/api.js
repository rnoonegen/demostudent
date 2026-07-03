const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getClassOverview: () => request('/classes'),
  getStudents: (classId) => request(`/students${classId ? `?classId=${classId}` : ''}`),
  getStudent: (id) => request(`/students/${id}`),
  getParentView: (id) => request(`/students/${id}/parent-view`),
  getAssessmentFramework: () => request('/assessments/framework'),
  getAssessments: (studentId) => request(`/assessments/student/${studentId}`),
  submitAssessment: (data) => request('/assessments', { method: 'POST', body: JSON.stringify(data) }),
  getReflections: (studentId) => request(`/reflections/student/${studentId}`),
  submitReflection: (data) => request('/reflections', { method: 'POST', body: JSON.stringify(data) }),
  getPortfolio: (studentId) => request(`/portfolio/student/${studentId}`),
  getAnalytics: (studentId) => request(`/analytics/student/${studentId}`),
  getMeta: () => request('/meta'),
};
