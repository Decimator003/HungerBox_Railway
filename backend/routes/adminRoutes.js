import express from 'express';
import { adminLogin } from '../controllers/authController.js';
import { deleteTrain, getAllUsers, getAllBookings } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);
router.delete('/trains/:trainId', deleteTrain);
router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);

export default router;