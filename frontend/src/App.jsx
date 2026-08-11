import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import { useMission } from './hooks/useMission';

function App() {
  const missionData = useMission();

  return (
    <div className="app-layout">
      <Header mission={missionData.mission} />
      <div className="app-body">
        <Sidebar />
        <MainContent {...missionData} />
      </div>
    </div>
  );
}

export default App;
