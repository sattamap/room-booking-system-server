import express from 'express';
import { addRoom } from './room.controller';

const router = express.Router();

// Route for creating a new room
router.post('/rooms', addRoom); 

export const roomRoutes = router;
