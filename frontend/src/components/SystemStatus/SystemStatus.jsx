import React, { useState } from 'react';
import './SystemStatus.css';
import SystemCard from './SystemCard';
import SystemFilters from './SystemFilters';

const SystemStatus = ({ systems }) => {
  const [filter, setFilter] = useState('Todos');

  const getFilteredSystems = () => {
    if (!systems) return [];
    if (filter === 'Todos') return systems;
    if (filter === 'Normal') return systems.filter(s => s.status === 'nominal' || s.status === 'normal' || s.level >= 80);
    if (filter === 'Aviso' || filter === 'Warning') return systems.filter(s => s.status === 'warning' || (s.level >= 50 && s.level < 80));
    if (filter === 'Crítico') return systems.filter(s => s.status === 'critical' || s.level < 50);
    return systems;
  };

  const filteredSystems = getFilteredSystems();

  return (
    <div className="glow-card system-status">
      <div className="section-header">
        <h3>Sistemas Críticos</h3>
        <SystemFilters currentFilter={filter} onFilterChange={setFilter} />
      </div>
      <div className="systems-grid">
        {filteredSystems.map(system => (
          <SystemCard key={system.id} system={system} />
        ))}
        {filteredSystems.length === 0 && (
          <div style={{ color: 'var(--text-muted)' }}>Nenhum sistema corresponde ao filtro.</div>
        )}
      </div>
    </div>
  );
};

export default SystemStatus;
