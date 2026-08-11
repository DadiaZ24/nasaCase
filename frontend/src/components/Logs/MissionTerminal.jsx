import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import './MissionTerminal.css';

const MissionTerminal = ({ logs }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'ALERTA': return 'var(--accent-red)';
      case 'RESOLUCAO': return 'var(--accent-green)';
      case 'SISTEMA': return 'var(--accent-cyan)';
      case 'SIMULACAO': return 'var(--text-muted)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="mission-terminal glow-card">
      <div className="terminal-header">
        <Terminal size={16} />
        <span>TERMINAL DA MISSÃO</span>
      </div>
      <div className="terminal-content" ref={terminalRef}>
        {logs?.length === 0 ? (
          <div className="terminal-line text-muted">A aguardar eventos...</div>
        ) : (
          logs?.map((entry, idx) => (
            <div key={idx} className="terminal-line type-in">
              <span className="log-time">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>
              <span className="log-type" style={{ color: getLogTypeColor(entry.type) }}>[{entry.type}]</span>
              <span className="log-msg">{entry.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MissionTerminal;
