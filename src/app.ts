import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user/user.route';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


// Register routes
app.use('/api/auth', userRoutes);

// Welcome route
app.get("/", (req: Request, res: Response) => {
    res.send("server is running!");
  });

export default app;
