import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import socket from '../services/socket';

/**
 * Hook principal que carrega todos os dados da missão
 * e subscreve a atualizações em tempo real via WebSocket
 */
export const useMission = () => {
  const [mission, setMission] = useState(null);
  const [systems, setSystems] = useState([]);
  const [crew, setCrew] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [weather, setWeather] = useState(null);
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar todos os dados da API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [missionRes, systemsRes, crewRes, alertsRes, energyRes, weatherRes, logRes] = await Promise.all([
        api.getMission(),
        api.getSystems(),
        api.getCrew(),
        api.getAlerts(),
        api.getEnergy(),
        api.getWeather(),
        api.getLog(),
      ]);
      setMission(missionRes);
      setSystems(systemsRes);
      setCrew(crewRes);
      setAlerts(alertsRes);
      setEnergy(energyRes);
      setWeather(weatherRes);
      setLog(logRes);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar dados na montagem
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Subscrever a eventos WebSocket para atualizações em tempo real
  useEffect(() => {
    // Atualizações da missão
    socket.on('mission:update', (data) => {
      setMission(data);
    });

    // Atualizações dos sistemas (recebe array completo)
    socket.on('system:update', (data) => {
      if (Array.isArray(data)) {
        setSystems(data);
      } else {
        setSystems(prev => prev.map(s => s.id === data.id ? data : s));
      }
    });

    // Atualizações da tripulação
    socket.on('crew:update', (data) => {
      if (Array.isArray(data)) {
        setCrew(data);
      } else {
        setCrew(prev => prev.map(c => c.id === data.id ? data : c));
      }
    });

    // Novo alerta
    socket.on('alert:new', (alert) => {
      setAlerts(prev => [alert, ...prev]);
    });

    // Alerta resolvido
    socket.on('alert:resolved', (resolved) => {
      setAlerts(prev => prev.map(a => a.id === resolved.id ? resolved : a));
    });

    // Novo registo de energia
    socket.on('energy:update', (entry) => {
      setEnergy(prev => [...prev, entry]);
    });

    // Atualização meteorológica
    socket.on('weather:update', (data) => {
      setWeather(data);
    });

    // Nova entrada no log
    socket.on('log:new', (entry) => {
      setLog(prev => [...prev, entry]);
    });

    // Tick da simulação
    socket.on('simulation:tick', (data) => {
      // O tick já emite mission:update separadamente
    });

    return () => {
      socket.off('mission:update');
      socket.off('system:update');
      socket.off('crew:update');
      socket.off('alert:new');
      socket.off('alert:resolved');
      socket.off('energy:update');
      socket.off('weather:update');
      socket.off('log:new');
      socket.off('simulation:tick');
    };
  }, []);

  return {
    mission,
    systems,
    crew,
    alerts,
    energy,
    weather,
    log,
    loading,
    error,
    refetch: fetchData,
  };
};
