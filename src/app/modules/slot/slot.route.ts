import express from "express";
import { SlotControllers } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validate from "../../middlewares/validate";
import { createSlotSchema, getAvailableSlotsSchema } from "./slot.validation";

const router = express.Router();

// Route for creating slots (only accessible by admin)
router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validate(createSlotSchema),
  SlotControllers.createSlot,
);

// Route for getting available slots
router.get(
  "/slots/availability",
  validate(getAvailableSlotsSchema),
  SlotControllers.getAvailableSlots,
);

export const slotRoutes = router;
