import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import UserModel from '../modules/user/user.model';

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
    const decoded = jwt.verify(jwtToken, config.jwt_secret as string) as JwtPayload;

    const { role, userId } = decoded;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, 'User not found.'));
    }

    // Check if the user's role matches the required roles
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(new AppError(httpStatus.FORBIDDEN, 'You do not have permission to access this resource.'));
    }

    req.user = decoded;
    next();
  });
};

export default auth;
