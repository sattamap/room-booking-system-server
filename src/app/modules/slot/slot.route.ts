import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();

// Route for creating slots
router.post('/slots', SlotControllers.addSlots);

export const slotRoutes = router;
