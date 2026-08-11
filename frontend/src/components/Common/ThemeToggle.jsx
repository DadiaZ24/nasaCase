import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      style={{
        background: 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px',
        borderRadius: '50%',
        transition: 'background 0.3s'
      }}
      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
