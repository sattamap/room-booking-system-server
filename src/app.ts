import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.route";
import { roomRoutes } from "./app/modules/room/room.route";
import { slotRoutes } from "./app/modules/slot/slot.route";
import { authRoutes } from "./app/modules/auth/auth.route";
import { bookingRoutes } from "./app/modules/booking/booking.router";
import notFound from "./app/middlewares/notFound";
import { errorHandler } from "./app/middlewares/errorHandler";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//  app routes
app.use("/api", router);

// Error handling middleware should be placed after all routes and notFoundHandler
app.use(errorHandler);

//Not Found handler
app.use(notFound);

// Welcome route
app.get("/", (req: Request, res: Response) => {
  res.send("server is running!");
});

export default app;
