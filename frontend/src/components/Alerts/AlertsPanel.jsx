import React, { useState } from 'react';
import './AlertsPanel.css';
import AlertCard from './AlertCard';
import AlertActionModal from './AlertActionModal';
import * as api from '../../services/api';

const AlertsPanel = ({ alerts, refetch }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const activeAlerts = (alerts || []).filter(a => !a.isResolved);
  
  const handleResolveSelect = (alert) => {
    setSelectedAlert(alert);
  };

  const handleActionSubmit = async (actionLabel) => {
    if (selectedAlert) {
      try {
        await api.resolveAlert(selectedAlert.id, actionLabel);
        if (refetch) refetch();
      } catch (e) {
        console.error('Failed to resolve alert', e);
      }
      setSelectedAlert(null);
    }
  };

  return (
    <div className="glow-card alerts-panel">
      <div className="alerts-header">
        <h3>Alertas Ativos</h3>
        <span className="alerts-badge">{activeAlerts.length}</span>
      </div>
      <div className="alerts-list">
        {activeAlerts.map(alert => (
          <AlertCard key={alert.id} alert={alert} onResolve={handleResolveSelect} />
        ))}
        {activeAlerts.length === 0 && (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>Todos os sistemas operacionais</div>
        )}
      </div>

      {selectedAlert && (
        <AlertActionModal 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)}
          onActionSelect={handleActionSubmit}
        />
      )}
    </div>
  );
};

export default AlertsPanel;
