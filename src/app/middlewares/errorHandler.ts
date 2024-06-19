
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../errors/AppError';
import NoDataFoundError from '../errors/NotFoundError';
import DuplicateEntryError from '../errors/DuplicateEntryError'; // Import the custom error

// Define base error responses
const baseErrorResponseWithoutStatusCode = {
    success: false,
    message: '',
};

const baseErrorResponseWithStatusCode = {
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR, // Default to 500, will be overridden
    message: '',
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handle NoDataFoundError specifically
    if (err instanceof NoDataFoundError) {
        return res.status(httpStatus.NOT_FOUND).json({
            ...baseErrorResponseWithStatusCode,
            statusCode: httpStatus.NOT_FOUND,
            message: err.message,
            data: [] // Include empty data array
        });
    }

    // Handle AppError specifically
    if (err instanceof AppError) {
        const errorResponse = {
            ...baseErrorResponseWithStatusCode,
            statusCode: err.statusCode,
            message: err.message,
            ...(err.showDetails && {
                errorMessages: err.errorMessages.length ? err.errorMessages : [{ path: '', message: err.message }],
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            }),
        };

        return res.status(err.statusCode).json(errorResponse);
    }

    // Handle Mongoose validation errors
    if (err instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(err.errors).map(e => ({ path: e.path, message: e.message }));
        return res.status(httpStatus.BAD_REQUEST).json({
            ...baseErrorResponseWithoutStatusCode,
            message: 'Validation Error',
            errorMessages,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }

    // Handle Mongoose cast errors
    if (err instanceof mongoose.Error.CastError) {
        return res.status(httpStatus.BAD_REQUEST).json({
            ...baseErrorResponseWithoutStatusCode,
            message: `Cast Error: Invalid ${err.path}: ${err.value}`,
            errorMessages: [{ path: err.path, message: `Invalid ${err.path}: ${err.value}` }],
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }

    // Handle MongoDB duplicate key errors
    if (err instanceof DuplicateEntryError) {
        return res.status(httpStatus.CONFLICT).json({
            ...baseErrorResponseWithoutStatusCode,
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? `DuplicateEntryError: ${err.message}` : undefined,
        });
    }

    // Handle generic errors and include statusCode for these
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ...baseErrorResponseWithoutStatusCode,
        //statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        errorMessages: [{ path: '', message: err.message }],
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
