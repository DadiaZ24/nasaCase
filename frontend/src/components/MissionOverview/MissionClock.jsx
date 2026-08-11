import React, { useState, useEffect } from 'react';

const MissionClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const h = String(time.getUTCHours()).padStart(2, '0');
  const m = String(time.getUTCMinutes()).padStart(2, '0');
  const s = String(time.getUTCSeconds()).padStart(2, '0');

  return (
    <div className="mission-clock" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent-cyan)', textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>
      DIA 142 | {h}:{m}:{s} MET
    </div>
  );
};

export default MissionClock;
