import React, { useState } from 'react';
import { Fingerprint, Lock } from 'lucide-react';
import './ClearanceScreen.css';

const ClearanceScreen = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toUpperCase() === 'ARES2035') {
      setError(false);
      setUnlocking(true);
      // Play unlock sound or voice here if needed
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance("Clearance granted. Welcome to Mission Control.");
        msg.rate = 1.1;
        msg.pitch = 0.9;
        window.speechSynthesis.speak(msg);
      }
      setTimeout(() => onUnlock(), 1500);
    } else {
      setError(true);
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance("Access denied.");
        window.speechSynthesis.speak(msg);
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className={`clearance-overlay ${unlocking ? 'fade-out' : ''}`}>
      <div className="clearance-box glow-card">
        <div className="clearance-header">
          <Fingerprint size={48} className={`fingerprint-icon ${unlocking ? 'authorized' : ''}`} />
          <h2>ARES-VII MISSION CONTROL</h2>
          <p>AUTHORIZED PERSONNEL ONLY</p>
        </div>
        
        <form onSubmit={handleSubmit} className="clearance-form">
          <div className={`input-group ${error ? 'error-shake' : ''}`}>
            <Lock size={20} className="lock-icon" />
            <input
              type="password"
              placeholder="ENTER CLEARANCE CODE"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={unlocking}
              autoFocus
            />
          </div>
          <button type="submit" disabled={unlocking || !code} className="auth-btn">
            {unlocking ? 'AUTHORIZING...' : 'AUTHENTICATE'}
          </button>
        </form>
        {error && <div className="error-msg">ACCESS DENIED</div>}
        <div className="hint-msg">Hint: ARES2035</div>
      </div>
    </div>
  );
};

export default ClearanceScreen;
