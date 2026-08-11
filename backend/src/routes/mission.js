import express from 'express';
import { getMission, updateMission } from '../controllers/missionController.js';

const router = express.Router();

router.get('/', getMission);
router.patch('/', updateMission);

export default router;
