import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { useSocket } from './useSocket';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { subscribe } = useSocket();

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error('Failed to fetch alerts', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const resolveAlert = async (id, action) => {
    try {
      await api.resolveAlert(id, action);
      fetchAlerts(); // refresh
    } catch (err) {
      console.error('Failed to resolve alert', err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    const unsub = subscribe('new_alert', (newAlert) => {
      setAlerts(prev => [newAlert, ...prev]);
    });
    return () => unsub();
  }, [subscribe]);

  return { alerts, loading, resolveAlert, refetch: fetchAlerts };
};
