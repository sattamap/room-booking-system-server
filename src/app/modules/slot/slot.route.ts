import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();

// Route for creating slots
router.post('/slots', SlotControllers.createSlot);

// Route for getting available slots
router.get('/slots/availability', SlotControllers.getAvailableSlots);

export const slotRoutes = router;
