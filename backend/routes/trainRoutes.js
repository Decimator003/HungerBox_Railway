import express from 'express';
import { getTrains, addTrain } from '../controllers/trainController.js';

const router = express.Router();

router.get('/', getTrains);
router.post('/', addTrain);

export default router;