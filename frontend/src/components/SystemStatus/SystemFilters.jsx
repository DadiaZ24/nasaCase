import React from 'react';

const SystemFilters = ({ currentFilter, onFilterChange }) => {
  const filters = ['Todos', 'Normal', 'Aviso', 'Crítico'];
  
  return (
    <div className="system-filters">
      {filters.map(filter => (
        <button 
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default SystemFilters;
