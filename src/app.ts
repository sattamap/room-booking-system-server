import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import { errorHandler } from "./app/middlewares/errorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

//  app routes
app.use("/api", router);


// Welcome route
app.get("/", (req: Request, res: Response) => {
  res.send("server-app is running!");
});


//Not Found handler
 app.use(notFound);

 // Error handling middleware should be placed after all routes and notFoundHandler
app.use(errorHandler);

export default app;
