// src/app/errors/auth.ts
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import UserModel from '../modules/user/user.model';
import mongoose from 'mongoose';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check if the token is missing
    if (!token || !token.startsWith('Bearer ')) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Authorization token is missing or invalid.'));
    }

    // Extract the token without 'Bearer '
    const jwtToken = token.split(' ')[1];

    // Verify the given token
    let decoded: JwtPayload ;
    try {
      decoded = jwt.verify(jwtToken, config.jwt_secret as string) as JwtPayload ;
    } catch (error) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token.'));
    }

    const { role } = decoded;

    // Check if the user exists
    const user = await UserModel.findById(decoded.userId); // Assuming userId is the correct field name in UserModel
    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, 'User not found.'));
    }

    // Check if the user's role matches the required roles
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(new AppError(httpStatus.FORBIDDEN, 'You do not have permission to access this resource.'));
    }

    // Attach user information to the request
    req.user = { 
      _id: user._id as mongoose.Types.ObjectId, // Ensure _id is of type ObjectId
      ...decoded 
    };

    next();
  });
};

export default auth;


