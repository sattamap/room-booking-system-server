import express from 'express';
import { SlotControllers } from './slot.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../errors/auth';

const router = express.Router();

// Route for creating slots (only accessible by admin)
router.post('/slots', auth(USER_ROLE.admin), SlotControllers.createSlot);

// Route for getting available slots
router.get('/slots/availability', SlotControllers.getAvailableSlots);

export const slotRoutes = router;
