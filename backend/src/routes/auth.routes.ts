import { Router } from 'express';
import { register } from '../controllers/auth.controller';

export const router = Router();

router.post('/register', register);
