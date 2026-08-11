import React from 'react';
import { ShieldAlert, Wrench, Battery, Clock, Users, Zap, X } from 'lucide-react';
import './AlertActionModal.css';

const getActionsForAlertCode = (code) => {
  if (code === 'ALT-042') return [
    { label: 'Ativar protocolo de proteção', icon: ShieldAlert, desc: 'Isola setor e aumenta blindagem magnética' },
    { label: 'Ignorar', icon: X, desc: 'Risco de dano aos sistemas de comunicação' },
    { label: 'Recolher painéis solares', icon: Zap, desc: 'Previne sobrecarga mas reduz energia gerada' }
  ];
  if (code === 'ALT-039') return [
    { label: 'Substituir filtro', icon: Wrench, desc: 'Requer 2h de EVA por 1 tripulante' },
    { label: 'Reparação temporária', icon: Wrench, desc: 'Estende vida útil em 24h, risco moderado' },
    { label: 'Usar reserva de O₂', icon: Battery, desc: 'Consome 5% da reserva estratégica' }
  ];
  if (code === 'ALT-041') return [
    { label: 'Reduzir consumo', icon: Battery, desc: 'Desativa sistemas não essenciais' },
    { label: 'Reorientar painéis', icon: Zap, desc: 'Melhora eficiência em 12%, requer calibração' },
    { label: 'Ativar reserva', icon: Battery, desc: 'Garante energia por +48h' }
  ];
  if (code === 'ALT-038') return [
    { label: 'Ajustar turnos', icon: Clock, desc: 'Adiciona 2h de descanso para a equipe' },
    { label: 'Administrar estimulantes', icon: Users, desc: 'Aumenta foco temporário, risco de fadiga posterior' },
    { label: 'Redistribuir tarefas', icon: Users, desc: 'Otimiza carga de trabalho atual' }
  ];
  return [
    { label: 'Investigar', icon: ShieldAlert, desc: 'Inicia diagnóstico completo do sistema' },
    { label: 'Reiniciar Sistema', icon: Zap, desc: 'Pode causar indisponibilidade temporária' }
  ];
};

const AlertActionModal = ({ alert, onClose, onActionSelect }) => {
  if (!alert) return null;
  const actions = getActionsForAlertCode(alert.code);

  return (
    <div className="modal-overlay">
      <div className="glow-card modal-content">
        <div className="modal-header">
          <h3>Resolver {alert.code}</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <p className="modal-desc">{alert.description}</p>
        <div className="actions-list">
          {actions.map((act, i) => {
            const Icon = act.icon;
            return (
              <button key={i} className="action-btn" onClick={() => onActionSelect(act.label)}>
                <div className="action-icon"><Icon size={24} /></div>
                <div className="action-text">
                  <span className="action-label">{act.label}</span>
                  <span className="action-desc">{act.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertActionModal;
