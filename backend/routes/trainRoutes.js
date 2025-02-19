import express from 'express';
import { getTrains, addTrain, searchTrain, getTrainsAvailability } from '../controllers/trainController.js';

const router = express.Router();

router.get('/', getTrains);
router.get('/search', searchTrain);
router.post('/', addTrain);
router.get('/availability', getTrainsAvailability);

export default router;