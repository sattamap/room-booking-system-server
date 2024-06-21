import { z } from "zod";
import mongoose from "mongoose";

// Helper to validate MongoDB ObjectId
const objectIdValidation = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId format",
  });

// Schema for booking creation
export const createBookingSchema = z.object({
  body: z.object({
    room: objectIdValidation,
    slots: z.array(objectIdValidation),
    user: objectIdValidation,
    date: z.coerce.date(), // Converts string to date and validates
  }),
});

// Schema for booking update
export const updateBookingSchema = z.object({
  body: z.object({
    room: objectIdValidation.optional(),
    slots: z.array(objectIdValidation).optional(),
    user: objectIdValidation.optional(),
    date: z.coerce.date().optional(),
    totalAmount: z.number().positive().optional(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

// Schema for booking ID parameter
export const bookingIdSchema = z.object({
  params: z.object({
    id: objectIdValidation,
  }),
});
