import express from 'express';
import { getSystems, getSystemById, updateSystem } from '../controllers/systemsController.js';

const router = express.Router();

router.get('/', getSystems);
router.get('/:id', getSystemById);
router.patch('/:id', updateSystem);

export default router;
