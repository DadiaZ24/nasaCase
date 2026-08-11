import express from 'express';
import { getCrew, getCrewById, updateCrew } from '../controllers/crewController.js';

const router = express.Router();

router.get('/', getCrew);
router.get('/:id', getCrewById);
router.patch('/:id', updateCrew);

export default router;
