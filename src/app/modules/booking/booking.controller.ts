// src/app/modules/booking/booking.controller.ts
import { Request, Response, NextFunction } from 'express';
import { BookingServices } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
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

export const BookingControllers = {
    createBooking
};
