import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import './Header.css';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ mission }) => {
  const { isDark, toggleTheme } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const h = String(time.getUTCHours()).padStart(2, '0');
    const m = String(time.getUTCMinutes()).padStart(2, '0');
    const s = String(time.getUTCSeconds()).padStart(2, '0');
    const day = mission?.currentDay || 142;
    return `DIA ${day} | ${h}:${m}:${s} MET`;
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Rocket className="header-icon" />
        <h1 className="header-title">ARES-VII MISSION CONTROL</h1>
      </div>
      <div className="header-center">
        <div className="mission-clock">{formatTime()}</div>
      </div>
      <div className="header-right">
        <div className="connection-status">
          <div className="status-dot"></div>
          <span>CONNECTED</span>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;
