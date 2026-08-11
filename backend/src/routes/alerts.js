import express from 'express';
import { getAlerts, getAlertById, createAlert, resolveAlert } from '../controllers/alertsController.js';

const router = express.Router();

router.get('/', getAlerts);
router.get('/:id', getAlertById);
router.post('/', createAlert);
router.patch('/:id/resolve', resolveAlert);

export default router;
