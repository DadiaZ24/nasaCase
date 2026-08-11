import React from 'react';
import './SpaceWeather.css';

const SpaceWeather = ({ weather }) => {
  if (!weather) return <div className="glow-card space-weather">Sem dados de clima</div>;

  const renderTrend = (trend) => {
    if (trend === 'rising') return <span className="trend up">↗️</span>;
    if (trend === 'falling') return <span className="trend down">↘️</span>;
    return <span className="trend stable">→</span>;
  };

  const getRiskClass = (value, threshold1, threshold2) => {
    if (value > threshold2) return { text: 'Alto', css: 'badge-red' };
    if (value > threshold1) return { text: 'Moderado', css: 'badge-yellow' };
    return { text: 'Baixo', css: 'badge-green' };
  };

  return (
    <div className="glow-card space-weather">
      <h3>Clima Espacial</h3>
      <ul className="weather-list">
        <li>
          <span className="w-label">Radiação Cósmica</span>
          <span className="w-value">{weather.cosmicRadiation} mSv/d {renderTrend(weather.trends?.cosmicRadiation)}</span>
          <span className={`risk ${getRiskClass(weather.cosmicRadiation, 8, 15).css}`}>{getRiskClass(weather.cosmicRadiation, 8, 15).text}</span>
        </li>
        <li>
          <span className="w-label">Atividade Solar</span>
          <span className="w-value">{weather.solarActivity} {renderTrend(weather.trends?.solarActivity)}</span>
          <span className={`risk ${weather.solarActivity.includes('X') || weather.solarActivity.includes('M') ? 'badge-red' : 'badge-green'}`}>
            {weather.solarActivity.includes('X') || weather.solarActivity.includes('M') ? 'Alto' : 'Baixo'}
          </span>
        </li>
        <li>
          <span className="w-label">Micrometeoritos</span>
          <span className="w-value">{weather.micrometeoriteProb}% {renderTrend(weather.trends?.micrometeoriteProb)}</span>
          <span className={`risk ${getRiskClass(weather.micrometeoriteProb, 5, 15).css}`}>{getRiskClass(weather.micrometeoriteProb, 5, 15).text}</span>
        </li>
        <li>
          <span className="w-label">Temp. Exterior</span>
          <span className="w-value">{weather.exteriorTemp}°C {renderTrend(weather.trends?.exteriorTemp)}</span>
          <span className="risk badge-green">Nominal</span>
        </li>
        <li>
          <span className="w-label">Vento Solar</span>
          <span className="w-value">{weather.solarWind} km/s {renderTrend(weather.trends?.solarWind)}</span>
          <span className={`risk ${getRiskClass(weather.solarWind, 400, 600).css}`}>{getRiskClass(weather.solarWind, 400, 600).text}</span>
        </li>
      </ul>
    </div>
  );
};

export default SpaceWeather;
