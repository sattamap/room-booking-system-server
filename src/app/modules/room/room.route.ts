import express from 'express';
import { RoomControllers } from './room.controller';
import auth from '../../errors/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

// Route for creating a new room (Admin only)
router.post('/rooms', auth(USER_ROLE.admin), RoomControllers.addRoom); 

// Route for retrieving a room by ID
router.get('/rooms/:id', auth(USER_ROLE.admin, USER_ROLE.user), RoomControllers.getRoom);

// Route for retrieving all rooms
router.get('/rooms', auth(USER_ROLE.admin, USER_ROLE.user), RoomControllers.getAllRooms);

// Route for updating a room by ID (Admin only)
router.put('/rooms/:id', auth(USER_ROLE.admin), RoomControllers.updateRoom);

// Route for deleting (soft deleting) a room by ID (Admin only)
router.delete('/rooms/:id', auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const roomRoutes = router;
