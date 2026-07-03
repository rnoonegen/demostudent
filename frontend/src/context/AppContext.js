import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const DEMO_STUDENT = { id: 's1', name: 'Ananya Sharma' };

export function AppProvider({ children }) {
  const [role, setRole] = useState('teacher');
  const [currentStudent, setCurrentStudent] = useState(DEMO_STUDENT);

  return (
    <AppContext.Provider value={{ role, setRole, currentStudent, setCurrentStudent }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
