import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './EnergyChart.css';

const EnergyChart = ({ energy }) => {
  const chartData = (energy || []).map(item => ({
    day: item.missionDay,
    gerada: item.energyGenerated,
    consumida: item.energyConsumed
  }));

  return (
    <div className="glow-card energy-chart-container">
      <h3>Balanço Energético (kWh)</h3>
      <div className="chart-wrapper">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="day" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }} />
              <Area type="monotone" dataKey="gerada" stroke="var(--accent-cyan)" fill="rgba(6, 182, 212, 0.2)" />
              <Area type="monotone" dataKey="consumida" stroke="var(--accent-orange)" fill="rgba(249, 115, 22, 0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
           <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Sem dados de energia</div>
        )}
      </div>
    </div>
  );
};

export default EnergyChart;
