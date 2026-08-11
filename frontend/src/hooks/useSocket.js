import { useEffect, useState, useCallback } from 'react';
import socket from '../services/socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const subscribe = useCallback((event, callback) => {
    socket.on(event, callback);
    return () => socket.off(event, callback);
  }, []);

  const emit = useCallback((event, data) => {
    socket.emit(event, data);
  }, []);

  return { isConnected, subscribe, emit };
};
