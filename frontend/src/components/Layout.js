import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NAV_BY_ROLE = {
  teacher: [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/students/s1', label: 'Student Profile' },
    { to: '/assess/s1', label: 'Assess Student' },
    { to: '/analytics/s1', label: 'Insights' },
    { to: '/reports', label: 'Reports' },
  ],
  student: [
    { to: '/', label: 'My Journey', end: true },
    { to: '/students/s1', label: 'My Profile' },
    { to: '/reflect/s1', label: 'Self-Reflection' },
    { to: '/portfolio/s1', label: 'Portfolio' },
  ],
  parent: [
    { to: '/parent/s1', label: 'Child Development', end: true },
    { to: '/portfolio/s1', label: 'Portfolio' },
  ],
  admin: [
    { to: '/', label: 'Overview', end: true },
    { to: '/reports', label: 'Reports' },
    { to: '/analytics/s1', label: 'Analytics' },
  ],
};

export default function Layout() {
  const { role, setRole } = useApp();
  const navItems = NAV_BY_ROLE[role] || NAV_BY_ROLE.teacher;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🌱</span>
          <div>
            <strong>GrowthPath</strong>
            <small>Integral Education</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="role-switcher">
          <label htmlFor="role">View as</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="admin">School Admin</option>
          </select>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
