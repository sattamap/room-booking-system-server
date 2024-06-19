// src/app/modules/user/user.route.ts
import { Router } from 'express';
import { signup } from './user.controller';
import validate from '../../middlewares/validate';
import { createUserSchema } from './user.validation'; // Import Zod schema for user creation

const router = Router();

// Route for user signup
router.post('/signup', validate(createUserSchema), signup);

export const userRoutes = router;
