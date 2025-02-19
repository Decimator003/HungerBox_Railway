import express from 'express';
import { registerUser, getUserDetails } from '../controllers/userController.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Get user details by userId
router.get('/:userId', getUserDetails);

export default router;