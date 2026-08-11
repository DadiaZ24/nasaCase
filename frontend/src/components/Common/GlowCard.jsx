import React from 'react';

const GlowCard = ({ children, className = '', style = {} }) => {
  return (
    <div className={`glow-card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GlowCard;
