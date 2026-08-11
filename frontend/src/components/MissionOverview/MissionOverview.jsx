import React from 'react';
import './MissionOverview.css';
import TravelProgress from './TravelProgress';
import { Gauge, MapPin, Radio } from 'lucide-react';

const formatNumber = (num, suffix = '') => {
  if (num === undefined || num === null) return '---';
  return `${num.toLocaleString('pt-PT')} ${suffix}`.trim();
};

const formatTime = (seconds) => {
  if (seconds === undefined || seconds === null) return '---';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
};

const MissionOverview = ({ mission }) => {
  if (!mission) return <div className="glow-card mission-overview">Sem dados da missão</div>;

  const distEarthStr = `${(mission.distanceToEarth / 1000000).toFixed(1).replace('.', ',')} M km`;
  const distMarsStr = `${(mission.distanceToMars / 1000000).toFixed(1).replace('.', ',')} M km`;

  return (
    <div className="glow-card mission-overview">
      <div className="mission-header">
        <div>
          <h2>{mission.name}</h2>
          <span className="phase-badge">Fase: {mission.currentPhase}</span>
        </div>
        <div className="destination">Destino: {mission.destination}</div>
      </div>
      
      <TravelProgress mission={mission} />
      
      <div className="metrics-grid">
        <div className="metric-box">
          <div className="metric-icon"><MapPin size={20} /></div>
          <div className="metric-data">
            <label>Dist. Terra</label>
            <div className="metric-value">{distEarthStr}</div>
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-icon"><MapPin size={20} /></div>
          <div className="metric-data">
            <label>Dist. Marte</label>
            <div className="metric-value">{distMarsStr}</div>
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-icon"><Gauge size={20} /></div>
          <div className="metric-data">
            <label>Velocidade</label>
            <div className="metric-value">{formatNumber(mission.currentSpeed, 'km/h')}</div>
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-icon"><Radio size={20} /></div>
          <div className="metric-data">
            <label>Atraso Com.</label>
            <div className="metric-value">{formatTime(mission.commDelay)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionOverview;
