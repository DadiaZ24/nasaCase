import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './src/middleware/logger.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import missionRoutes from './src/routes/mission.js';
import systemsRoutes from './src/routes/systems.js';
import crewRoutes from './src/routes/crew.js';
import alertsRoutes from './src/routes/alerts.js';
import energyRoutes from './src/routes/energy.js';
import weatherRoutes from './src/routes/weather.js';
import logRoutes from './src/routes/log.js';
import simulationRoutes from './src/routes/simulation.js';
import { initSocket } from './src/sockets/missionSocket.js';
import { simulationService } from './src/services/simulationService.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configuração do Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PATCH']
  }
});

// Passa o IO para os serviços
initSocket(io);
simulationService.setIo(io);

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(logger);

// Rotas
app.use('/api/mission', missionRoutes);
app.use('/api/systems', systemsRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/log', logRoutes);
app.use('/api/simulation', simulationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
