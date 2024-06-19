// src/app/middlewares/auth.ts
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import UserModel from '../modules/user/user.model';
import mongoose from 'mongoose';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Authorization token is missing or invalid.', false, [], false));
    }

    const jwtToken = token.split(' ')[1];

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(jwtToken, config.jwt_secret as string) as JwtPayload;
    } catch (error) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token.', false, [], false));
    }

    const { role } = decoded;

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, 'User not found.', false, [], false));
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route', false, [], false));
    }

    req.user = {
      _id: user._id as mongoose.Types.ObjectId,
      ...decoded,
    };

    next();
  });
};

export default auth;
