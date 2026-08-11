import React from 'react';
import StatusBadge from '../Common/StatusBadge';
import { Cpu, Wind, Shield, Radio, Activity } from 'lucide-react';

const getIcon = (name) => {
  if (name.includes('Suporte de Vida') || name.includes('O2')) return <Wind size={24} />;
  if (name.includes('Escudo')) return <Shield size={24} />;
  if (name.includes('Comunica')) return <Radio size={24} />;
  if (name.includes('Propul')) return <Activity size={24} />;
  return <Cpu size={24} />;
};

const SystemCard = ({ system }) => {
  const level = system.level || Math.floor(Math.random() * 100);
  const isNormal = level >= 80;
  const isWarning = level >= 50 && level < 80;
  
  const statusColor = isNormal ? 'var(--accent-green)' : isWarning ? 'var(--accent-yellow)' : 'var(--accent-red)';
  const statusText = isNormal ? 'Nominal' : isWarning ? 'Verificar' : 'Crítico';

  const dashArray = 251.2; // 2 * pi * r (r=40)
  const dashOffset = dashArray - (dashArray * level) / 100;

  return (
    <div className={`system-card status-${statusText.toLowerCase()}`}>
      <h4>{system.name || 'Sistema'}</h4>
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 12 }}>
        <svg width="80" height="80" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
          <circle cx="50" cy="50" r="40" fill="transparent" stroke={statusColor} strokeWidth="6" strokeDasharray={dashArray} strokeDashoffset={dashOffset} style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: statusColor }}>
          {getIcon(system.name || '')}
        </div>
      </div>
      <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', marginBottom: 8, color: 'var(--text-primary)' }}>{level}%</div>
      <StatusBadge status={statusText} />
    </div>
  );
};

export default SystemCard;
