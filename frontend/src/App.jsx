import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import ClearanceScreen from './components/Auth/ClearanceScreen';
import { useMission } from './hooks/useMission';
import { useTheme } from './context/ThemeContext';
import { useHash } from './hooks/useHash';

function App() {
  const missionData = useMission();
  const { isDark } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentHash = useHash();

  // Check for red alert conditions (unresolved High priority alerts)
  const isRedAlert = missionData.alerts?.some(
    (a) => a.priority === 'Alta' && !a.isResolved
  );

  useEffect(() => {
    if (isRedAlert) {
      document.body.classList.add('red-alert-mode');
    } else {
      document.body.classList.remove('red-alert-mode');
    }
  }, [isRedAlert]);

  return (
    <div className={`app-layout ${isDark ? 'dark' : 'light'}`}>
      {!isAuthenticated && <ClearanceScreen onUnlock={() => setIsAuthenticated(true)} />}
      <Header mission={missionData.mission} />
      <div className="app-body">
        <Sidebar activeRoute={currentHash} />
        <MainContent {...missionData} route={currentHash} />
      </div>
    </div>
  );
}

export default App;
