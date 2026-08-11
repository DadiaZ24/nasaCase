import { simulationService } from '../services/simulationService.js';
import { decisionService, setDecisionIo } from '../services/decisionService.js';

export const initSocket = (io) => {
  setDecisionIo(io);
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('alert:resolve', async (data) => {
      try {
        await decisionService.resolveAlert(data.alertId, data.action);
      } catch (err) {
        console.error('Erro ao resolver alerta:', err);
      }
    });

    socket.on('simulation:control', (data) => {
      if (data.action === 'start') {
        simulationService.start();
      } else if (data.action === 'stop') {
        simulationService.stop();
      }
    });

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};
