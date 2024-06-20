// src/app/modules/slot/slot.validation.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Helper to validate MongoDB ObjectId
const objectIdValidation = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid ObjectId format',
  });

// Schema for slot creation
export const createSlotSchema = z.object({
  body: z.object({
    room: objectIdValidation,
    date: z.coerce.date(), // Converts string to date and validates
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid start time format'),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid end time format'),
    isBooked: z.boolean().optional().default(false),
  }),
});

// Schema for querying available slots
export const getAvailableSlotsSchema = z.object({
  query: z.object({
    date: z.coerce.date().optional(), // Converts string to date and validates
    roomId: objectIdValidation.optional(),
  }),
});
