import express from 'express';
import { getWeather, getWeatherHistory } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/', getWeather);
router.get('/history', getWeatherHistory);

export default router;
