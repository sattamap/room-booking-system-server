import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user/user.route';
import { roomRoutes } from './app/modules/room/room.route';
import { slotRoutes } from './app/modules/slot/slot.route';
import { authRoutes } from './app/modules/auth/auth.route';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


// Register routes
app.use('/api/auth', userRoutes);

// Use the room routes
app.use('/api', roomRoutes);

// Use the slot routes
app.use('/api', slotRoutes);
// Routes
app.use('/api/auth', authRoutes);


// Welcome route
app.get("/", (req: Request, res: Response) => {
    res.send("server is running!");
  });



export default app;
