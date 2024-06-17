// import express from 'express';
// import { BookingControllers } from './booking.controller';
// import auth from '../../errors/auth';
// import { USER_ROLE } from '../user/user.constant';


// const router = express.Router();

// // Route for creating bookings (only accessible by authenticated users)
// router.post('/bookings', auth(USER_ROLE.user, USER_ROLE.admin), BookingControllers.createBooking);

// export const bookingRoutes = router;


import express from 'express';
import { BookingControllers } from './booking.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../errors/auth';

const router = express.Router();

// Route for creating bookings (only accessible by authenticated users)
router.post('/bookings', auth(USER_ROLE.user, USER_ROLE.admin), BookingControllers.createBooking);

export const bookingRoutes = router;
