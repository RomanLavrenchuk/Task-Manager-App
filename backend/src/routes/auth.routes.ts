import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
