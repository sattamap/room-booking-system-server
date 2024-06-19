import { Request, Response, NextFunction } from 'express';
import { BookingServices } from './booking.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

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
    const bookings = await BookingServices.getAllBookings();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All bookings retrieved successfully',
        data: bookings,
    });
});

const getUserBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const bookings = await BookingServices.getUserBookings(userId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User bookings retrieved successfully',
        data: bookings
    });
});

const updateBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id;
    const updateData = req.body;
    const updatedBooking = await BookingServices.updateBooking(bookingId, updateData);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: updatedBooking
    });
});

const deleteBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id;
    const deletedBooking = await BookingServices.deleteBooking(bookingId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking deleted successfully',
        data: deletedBooking
    });
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBooking,
    deleteBooking
};
