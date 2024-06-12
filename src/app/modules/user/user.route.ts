import { Router } from 'express';
import { signup } from './user.controller';

const router = Router();

router.post('/signup', signup);

export const userRoutes =router;