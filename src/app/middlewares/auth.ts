import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import UnauthorizedError from "../errors/UnauthorizedError";
import catchAsync from "../utils/catchAsync";
import UserModel from "../modules/user/user.model";
import mongoose from "mongoose";

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return next(
        new UnauthorizedError("Authorization token is missing or invalid."),
      );
    }

    const jwtToken = token.split(" ")[1];

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(jwtToken, config.jwt_secret as string) as JwtPayload;
    } catch (error) {
      return next(new UnauthorizedError("Invalid token."));
    }

    const { role } = decoded;

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return next(new UnauthorizedError("User not found."));
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(new UnauthorizedError("You have no access to this route."));
    }

    req.user = {
      _id: user._id as mongoose.Types.ObjectId,
      ...decoded,
    };

    next();
  });
};

export default auth;
