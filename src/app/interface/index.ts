import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & { _id: mongoose.Types.ObjectId }; // Extending the user to include _id
    }
  }
}
