import express from 'express';
import { bookTicket, cancelBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', bookTicket);
router.delete('/:bookingId', cancelBooking);

export default router;