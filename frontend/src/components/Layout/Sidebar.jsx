import React from 'react';
import { LayoutDashboard, Server, Users, Zap, CloudLightning, Bell, FileText, Play, Pause } from 'lucide-react';
import './Sidebar.css';
import * as api from '../../services/api';

const Sidebar = () => {
  const handleStartSim = () => api.startSimulation().catch(console.error);
  const handleStopSim = () => api.stopSimulation().catch(console.error);

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <a href="#overview" className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Visão Geral</span>
        </a>
        <a href="#systems" className="nav-item">
          <Server size={20} />
          <span>Sistemas</span>
        </a>
        <a href="#crew" className="nav-item">
          <Users size={20} />
          <span>Tripulação</span>
        </a>
        <a href="#energy" className="nav-item">
          <Zap size={20} />
          <span>Energia</span>
        </a>
        <a href="#weather" className="nav-item">
          <CloudLightning size={20} />
          <span>Clima Espacial</span>
        </a>
        <a href="#alerts" className="nav-item">
          <Bell size={20} />
          <span>Alertas</span>
        </a>
        <a href="#log" className="nav-item">
          <FileText size={20} />
          <span>Registro</span>
        </a>
      </nav>
      <div className="sidebar-bottom">
        <div className="sim-controls">
          <button className="sim-btn" onClick={handleStartSim} title="Iniciar Simulação"><Play size={16}/></button>
          <button className="sim-btn" onClick={handleStopSim} title="Parar Simulação"><Pause size={16}/></button>
          <span className="sim-speed">1x</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
