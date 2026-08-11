import React from 'react';

const ProgressBar = ({ value, max = 100, color = 'var(--accent-cyan)' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div style={{
      width: '100%',
      height: '6px',
      backgroundColor: 'var(--bg-tertiary)',
      borderRadius: '3px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        transition: 'width 0.5s ease-out',
      }} />
    </div>
  );
};

export default ProgressBar;
