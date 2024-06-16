import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;  // Augment the Express Request interface to include user of type JwtPayload
    }
  }
}
