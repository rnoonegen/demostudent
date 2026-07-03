import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentProfile from './pages/StudentProfile';
import AssessmentEntry from './pages/AssessmentEntry';
import SelfReflection from './pages/SelfReflection';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import ParentView from './pages/ParentView';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="assess/:id" element={<AssessmentEntry />} />
            <Route path="reflect/:id" element={<SelfReflection />} />
            <Route path="portfolio/:id" element={<Portfolio />} />
            <Route path="analytics/:id" element={<Analytics />} />
            <Route path="parent/:id" element={<ParentView />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
