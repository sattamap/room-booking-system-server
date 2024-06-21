import { Request, Response, NextFunction } from 'express';
import { BookingServices } from './booking.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { isPopulatedRoom, isPopulatedUser } from '../../utils/typeGuards';
import BookingModel from './booking.model';
import { IRoom, IUser } from './booking.interface';



const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const booking = await BookingServices.createBooking(req.body, req.user);

    const roomData = isPopulatedRoom(booking.room) ? {
        _id: booking.room._id,
        name: booking.room.name,
        roomNo: booking.room.roomNo,
        floorNo: booking.room.floorNo,
        capacity: booking.room.capacity,
        pricePerSlot: booking.room.pricePerSlot,
        amenities: booking.room.amenities,
        isDeleted: booking.room.isDeleted
    } : { _id: booking.room };

    const userData = isPopulatedUser(booking.user) ? {
        _id: booking.user._id,
        name: booking.user.name,
        email: booking.user.email,
        phone: booking.user.phone,
        address: booking.user.address,
        role: booking.user.role
    } : { _id: booking.user };

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: {
            _id: booking._id,
            date: booking.date,
            slots: booking.slots.map((slot: any) => ({
                _id: slot._id,
                room: slot.room,
                date: slot.date,
                startTime: slot.startTime,
                endTime: slot.endTime,
                isBooked: slot.isBooked
            })),
            room: roomData,
            user: userData,
            totalAmount: booking.totalAmount,
            isConfirmed: booking.isConfirmed,
            isDeleted: booking.isDeleted
        }
    });
});


const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await BookingServices.getAllBookings();

    const formattedBookings = bookings.map(booking => ({
        _id: booking._id,
        date: booking.date,
        slots: booking.slots.map(slot => ({
            _id: slot._id,
            room: slot.room,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: slot.isBooked,
        })),
        room: isPopulatedRoom(booking.room) ? {
            _id: booking.room._id,
            name: booking.room.name,
            roomNo: booking.room.roomNo,
            floorNo: booking.room.floorNo,
            capacity: booking.room.capacity,
            pricePerSlot: booking.room.pricePerSlot,
            amenities: booking.room.amenities,
            isDeleted: booking.room.isDeleted,
        } : { _id: booking.room },
        user: isPopulatedUser(booking.user) ? {
            _id: booking.user._id,
            name: booking.user.name,
            email: booking.user.email,
            phone: booking.user.phone,
            address: booking.user.address,
            role: booking.user.role,
        } : { _id: booking.user },
        totalAmount: booking.totalAmount,
        isConfirmed: booking.isConfirmed,
        isDeleted: booking.isDeleted,
    }));

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All bookings retrieved successfully',
        data: formattedBookings,
    });
});

const getUserBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const bookings = await BookingServices.getUserBookings(userId);

    const formattedBookings = bookings.map((booking) => ({
        _id: booking._id,
        date: booking.date,
        slots: booking.slots.map((slot) => ({
            _id: slot._id,
            room: slot.room,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: slot.isBooked,
        })),
        room: isPopulatedRoom(booking.room) ? {
            _id: booking.room._id,
            name: booking.room.name,
            roomNo: booking.room.roomNo,
            floorNo: booking.room.floorNo,
            capacity: booking.room.capacity,
            pricePerSlot: booking.room.pricePerSlot,
            amenities: booking.room.amenities,
            isDeleted: booking.room.isDeleted,
        } : { _id: booking.room },
        totalAmount: booking.totalAmount,
        isConfirmed: booking.isConfirmed,
        isDeleted: booking.isDeleted,
    }));

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User bookings retrieved successfully',
        data: formattedBookings,
    });
});



// Type guard for IRoom
function isIRoom(room: any): room is IRoom {
    return room && room._id;
}

// Type guard for IUser
function isIUser(user: any): user is IUser {
    return user && user._id;
}

const updateBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Assuming the booking ID is in the route params
    const updateData = req.body; // Assuming the update data is passed in the request body

    const updatedBooking = await BookingServices.updateBooking(id, updateData);

    // Fetch the updated booking with populated room and user
    const populatedBooking = await BookingModel.findById(updatedBooking._id)
        .populate('room', '_id')
        .populate('user', '_id')
        .exec();

    if (!populatedBooking) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Booking not found',
        });
    }

    // Prepare the response data
    let responseData: any = {
        _id: populatedBooking._id,
        date: populatedBooking.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        slots: populatedBooking.slots.map(slot => slot._id), // Assuming slots are stored as an array of ObjectId references
        totalAmount: populatedBooking.totalAmount,
        room: null, 
        user: null, 
        isConfirmed: populatedBooking.isConfirmed,
        isDeleted: populatedBooking.isDeleted,
    };

    // Check if room is IRoom and add _id
    if (isIRoom(populatedBooking.room)) {
        responseData.room = populatedBooking.room._id;
    } else {
        responseData.room = populatedBooking.room.toString(); // Convert ObjectId to string if not IRoom
    }

    // Check if user is IUser and add _id
    if (isIUser(populatedBooking.user)) {
        responseData.user = populatedBooking.user._id;
    } else {
        responseData.user = populatedBooking.user.toString(); // Convert ObjectId to string if not IUser
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: responseData,
    });
});


const deleteBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Assuming the booking ID is in the route params

    // Fetch the booking before deleting it
    const bookingToDelete = await BookingModel.findById(id)
        .populate('room', '_id')
        .populate('user', '_id')
        .exec();

    if (!bookingToDelete) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Booking not found',
        });
    }

    // Delete the booking
    await BookingServices.deleteBooking(id);

    // Prepare the response data
    let responseData: any = {
        _id: bookingToDelete._id,
        date: bookingToDelete.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        slots: bookingToDelete.slots.map(slot => slot._id), // Assuming slots are stored as an array of ObjectId references
        totalAmount: bookingToDelete.totalAmount,
        room: null, // Placeholder for room ID
        user: null, // Placeholder for user ID
        isConfirmed: bookingToDelete.isConfirmed,
        isDeleted: true, // Set isDeleted to true since the booking is deleted
    };

    // Check if room is IRoom and add _id
    if (isIRoom(bookingToDelete.room)) {
        responseData.room = bookingToDelete.room._id;
    } else {
        responseData.room = bookingToDelete.room.toString(); // Convert ObjectId to string if not IRoom
    }

    // Check if user is IUser and add _id
    if (isIUser(bookingToDelete.user)) {
        responseData.user = bookingToDelete.user._id;
    } else {
        responseData.user = bookingToDelete.user.toString(); // Convert ObjectId to string if not IUser
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking deleted successfully',
        data: responseData,
    });
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBooking,
    deleteBooking
};
