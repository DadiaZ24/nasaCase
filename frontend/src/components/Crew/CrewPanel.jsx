import React from 'react';
import './CrewPanel.css';
import StatusBadge from '../Common/StatusBadge';

const CrewPanel = ({ crew }) => {
  if (!crew || crew.length === 0) return <div className="glow-card crew-panel">Sem dados da tripulação</div>;

  return (
    <div className="glow-card crew-panel">
      <h3>Tripulação</h3>
      <div className="crew-list">
        {crew.map(member => {
          const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2);
          const healthPercent = member.healthStatus === 'Excellent' || member.healthStatus === 'Excelente' ? 100 : member.healthStatus === 'Good' || member.healthStatus === 'Bom' ? 85 : member.healthStatus === 'Fair' || member.healthStatus === 'Razoável' ? 65 : 40;
          const healthColor = healthPercent > 80 ? 'var(--accent-green)' : healthPercent > 60 ? 'var(--accent-yellow)' : 'var(--accent-red)';
          
          return (
            <div key={member.id} className="crew-card">
              <div className="crew-avatar" style={{ background: member.avatarColor || 'var(--accent-blue)' }}>
                {initials}
              </div>
              <div className="crew-info">
                <h4>{member.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{member.currentTask || member.role}</span>
                  <StatusBadge status={member.healthStatus === 'Good' ? 'normal' : member.healthStatus === 'Fair' ? 'warning' : 'critical'} text={member.healthStatus} />
                </div>
                <div className="health-bar" title={`Saúde: ${member.healthStatus} | Sono: ${member.sleepHours}h`}>
                  <div className="health-fill" style={{ width: `${healthPercent}%`, background: healthColor }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrewPanel;
