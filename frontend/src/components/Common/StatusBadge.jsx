import React from 'react';

const StatusBadge = ({ status, text }) => {
  const getColors = () => {
    switch(status.toLowerCase()) {
      case 'nominal':
      case 'normal':
      case 'good':
      case 'low':
        return 'var(--accent-green)';
      case 'warning':
      case 'moderate':
        return 'var(--accent-yellow)';
      case 'critical':
      case 'high':
      case 'alert':
        return 'var(--accent-red)';
      default:
        return 'var(--text-muted)';
    }
  };

  const color = getColors();

  return (
    <span style={{
      backgroundColor: `${color}33`, // 20% opacity
      color: color,
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {text || status}
    </span>
  );
};

export default StatusBadge;
