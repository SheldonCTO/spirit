import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import AuthService from '../services/authService.js';
import pool from '../utils/db.js';

const router = Router();
const authService = new AuthService(pool);
const authController = new AuthController(authService);

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;