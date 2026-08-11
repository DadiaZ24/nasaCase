import React from 'react';
import './MainContent.css';
import MissionOverview from '../MissionOverview/MissionOverview';
import SystemStatus from '../SystemStatus/SystemStatus';
import CrewPanel from '../Crew/CrewPanel';
import AlertsPanel from '../Alerts/AlertsPanel';
import EnergyChart from '../Energy/EnergyChart';
import SpaceWeather from '../Weather/SpaceWeather';
import MissionTerminal from '../Logs/MissionTerminal';

const MainContent = (props) => {
  const { mission, systems, crew, alerts, energy, weather, log, loading, error, refetch } = props;

  if (loading && !mission) {
    return (
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>
          A INICIAR CONEXÃO À ARES-VII...
        </div>
      </main>
    );
  }

  if (error && !mission) {
    return (
      <main className="main-content" style={{ display: 'flex', flexColum: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '16px' }}>
          FALHA DE COMUNICAÇÃO: {error}
        </div>
        <button onClick={refetch} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--accent-red)', color: 'var(--text-primary)', cursor: 'pointer' }}>TENTAR NOVAMENTE</button>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="dashboard-grid">
        <div className="grid-section section-overview">
          <MissionOverview mission={mission} />
        </div>
        <div className="grid-section section-alerts">
          <AlertsPanel alerts={alerts} refetch={refetch} />
        </div>
        <div className="grid-section section-systems">
          <SystemStatus systems={systems} />
        </div>
        <div className="grid-section section-crew">
          <CrewPanel crew={crew} />
        </div>
        <div className="grid-section section-energy">
          <EnergyChart energy={energy} />
        </div>
        <div className="grid-section section-weather">
          <SpaceWeather weather={weather} />
        </div>
      </div>
      <MissionTerminal logs={log} />
    </main>
  );
};

export default MainContent;
