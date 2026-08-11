import express from 'express';
import { getEnergyLogs, createEnergyLog, getEnergyStats } from '../controllers/energyController.js';

const router = express.Router();

router.get('/', getEnergyLogs);
router.post('/', createEnergyLog);
router.get('/stats', getEnergyStats);

export default router;
