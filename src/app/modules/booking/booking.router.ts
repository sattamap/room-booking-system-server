
import express from 'express';
import { BookingControllers } from './booking.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

// Route for creating bookings (only accessible by authenticated users)
router.post('/bookings', auth(USER_ROLE.user), BookingControllers.createBooking);
// Route for retrieving all bookings (only accessible by admin)
router.get('/bookings', auth(USER_ROLE.admin), BookingControllers.getAllBookings);
// Route for creating bookings (only accessible by authenticated users)
router.get('/my-bookings', auth(USER_ROLE.user), BookingControllers.getUserBookings);
// Route for updating bookings (only accessible by admin)
router.put('/bookings/:id', auth(USER_ROLE.admin), BookingControllers.updateBooking);
// Route for deleting bookings (only accessible by admin)
router.delete('/bookings/:id',auth(USER_ROLE.admin), BookingControllers.deleteBooking);

export const bookingRoutes = router;
