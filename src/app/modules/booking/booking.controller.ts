// src/app/modules/booking/booking.controller.ts

import { Request, Response, NextFunction } from 'express';
import { BookingServices } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { checkDataExistence } from './booking.utils'; // Import the utility function

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const booking = await BookingServices.createBooking(req.body, req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: booking
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await BookingServices.getAllBookings();
        checkDataExistence(bookings);
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All bookings retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

const getUserBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const bookings = await BookingServices.getUserBookings(userId);
    checkDataExistence(bookings);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User bookings retrieved successfully',
        data: bookings
    });
});

const updateBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = new mongoose.Types.ObjectId(req.params.id);
        const updateData = req.body;
        const updatedBooking = await BookingServices.updateBooking(bookingId, updateData);
        checkDataExistence(updatedBooking);
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

const deleteBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = new mongoose.Types.ObjectId(req.params.id);
        const deletedBooking = await BookingServices.deleteBooking(bookingId);
        checkDataExistence(deletedBooking);
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking deleted successfully',
            data: deletedBooking
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBooking,
    deleteBooking
};
