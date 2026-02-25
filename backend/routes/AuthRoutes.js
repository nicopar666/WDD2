import express from 'express';
const router = express.Router();
import { register, login } from '../controller/AuthController.js';

// POST /api/register - Register a new user
router.post('/register', register);

// POST /api/login - Login user
router.post('/login', login);

export default router;
