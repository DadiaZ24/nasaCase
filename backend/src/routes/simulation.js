import express from 'express';
import { startSimulation, stopSimulation, tickSimulation, getSimulationStatus } from '../controllers/simulationController.js';

const router = express.Router();

router.post('/start', startSimulation);
router.post('/stop', stopSimulation);
router.post('/tick', tickSimulation);
router.get('/status', getSimulationStatus);

export default router;
