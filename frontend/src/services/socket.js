import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : undefined);

const socket = io(WS_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000
});

export default socket;
