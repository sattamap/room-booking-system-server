

import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import DuplicateEntryError from '../errors/DuplicateEntryError';
import ValidationError from '../errors/ValidationError';
import CastError from '../errors/CastError';
import NoDataFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError'; // Import UnauthorizedError

const baseErrorResponse = {
  success: false,
  message: '',
  errorMessages: [] as { path: string; message: string }[],
};

const baseNotFoundResponse = {
  success: false,
  statusCode: 404,
  message: 'No Data Found',
  data: [],
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle NoDataFoundError
  if (err instanceof NoDataFoundError) {
    return res.status(httpStatus.NOT_FOUND).json(baseNotFoundResponse);
  }

  // Handle UnauthorizedError specifically
  if (err instanceof UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: err.message,
    });
  }

  // Handle other AppError instances
  if (err instanceof AppError) {
    const response = {
      ...baseErrorResponse,
      message: err.message,
      errorMessages: err.errorMessages.length ? err.errorMessages : [{ path: '', message: err.message }],
      stack: process.env.NODE_ENV === 'development' ? `MongoServerError: ${err.message}` : undefined,
    };

    return res.status(err.statusCode).json(response);
  }

  // Handle generic errors
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    ...baseErrorResponse,
    message: err.message,
    errorMessages: [{ path: '', message: err.message }],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
