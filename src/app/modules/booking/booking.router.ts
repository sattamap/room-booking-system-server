// src/app/modules/booking/booking.router.ts
import express from 'express';

import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { createBookingSchema, updateBookingSchema, bookingIdSchema } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

// Route for creating bookings (only accessible by authenticated users)
router.post('/bookings', auth(USER_ROLE.user), validate(createBookingSchema), BookingControllers.createBooking);

// Route for retrieving all bookings (only accessible by admin)
router.get('/bookings', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

// Route for retrieving user-specific bookings (only accessible by authenticated users)
router.get('/my-bookings', auth(USER_ROLE.user), BookingControllers.getUserBookings);

// Route for updating bookings (only accessible by admin)
router.put('/bookings/:id', auth(USER_ROLE.admin), validate(bookingIdSchema), validate(updateBookingSchema), BookingControllers.updateBooking);

// Route for deleting bookings (only accessible by admin)
router.delete('/bookings/:id', auth(USER_ROLE.admin), validate(bookingIdSchema), BookingControllers.deleteBooking);

export const bookingRoutes = router;
