import React from 'react';
import { Rocket } from 'lucide-react';

const TravelProgress = ({ mission }) => {
  if (!mission) return null;

  const total = mission.totalDistance || 225000000;
  let progress = (mission.distanceToEarth / total) * 100;
  if (progress > 100) progress = 100;
  if (progress < 0) progress = 0;
  
  return (
    <div className="travel-progress">
      <div className="progress-labels">
        <span className="planet-earth">Terra</span>
        <span className="progress-value">{progress.toFixed(1)}%</span>
        <span className="planet-mars">Marte</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          <Rocket className="ship-icon" size={24} style={{ animation: 'shipGlow 2s infinite' }} />
        </div>
      </div>
    </div>
  );
};

export default TravelProgress;
