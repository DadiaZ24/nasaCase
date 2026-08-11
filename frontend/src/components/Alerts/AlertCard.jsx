import React from 'react';

const AlertCard = ({ alert, onResolve }) => {
  const isHigh = alert.priority === 'high';
  const isResolved = alert.isResolved;

  return (
    <div className={`alert-item priority-${alert.priority} ${isResolved ? 'resolved' : ''} ${isHigh && !isResolved ? 'pulse' : ''}`}>
      <div className="alert-meta">
        <span className="alert-id">{alert.code}</span>
        {!isResolved && (
          <button className="resolve-btn" onClick={() => onResolve(alert)}>Resolver</button>
        )}
      </div>
      <h4 style={{ textDecoration: isResolved ? 'line-through' : 'none' }}>{alert.title}</h4>
      <p>{alert.description || alert.desc}</p>
      {alert.recommendedAction && !isResolved && (
        <div className="recommended-action" style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--accent-orange)' }}>
          Ação Recomendada: {alert.recommendedAction}
        </div>
      )}
      {isResolved && (
        <div className="resolved-time" style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Resolvido: {new Date(alert.resolvedAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default AlertCard;
