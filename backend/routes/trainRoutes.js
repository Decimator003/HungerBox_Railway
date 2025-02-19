import express from 'express';
import { getTrains, addTrain, searchTrain } from '../controllers/trainController.js';

const router = express.Router();

router.get('/', getTrains);
router.get('/search', searchTrain);
router.post('/', addTrain);

export default router;