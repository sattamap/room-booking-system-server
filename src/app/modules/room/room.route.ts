import express from 'express';
import { RoomControllers } from './room.controller';


const router = express.Router();

// Route for creating a new room
router.post('/rooms', RoomControllers.addRoom); 
// Route for retrieving a room by ID
router.get('/rooms/:id', RoomControllers.getRoom);

export const roomRoutes = router;
