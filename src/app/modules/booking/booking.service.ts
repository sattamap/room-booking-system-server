import BookingModel from './booking.model';
import SlotModel from '../slot/slot.model';
import RoomModel from '../room/room.model';
import { IBooking } from './booking.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import NoDataFoundError from '../../errors/NotFoundError';

const createBooking = async (bookingData: IBooking, user: { _id: mongoose.Types.ObjectId }) => {
    const { room, slots, date } = bookingData;

  
    // Validate that slots exist and are available for the given date
    const foundSlots = await SlotModel.find({ _id: { $in: slots }, isBooked: false, date });
    if (foundSlots.length !== slots.length) {
        throw new AppError(400, 'One or more slots are already booked, do not exist, or are not available on the specified date');
    }

    // Fetch the room data to get the price per slot
    const roomData = await RoomModel.findById(room);
    if (!roomData) {
        throw new AppError(404, 'Room not found');
    }

    // Calculate the total amount
    const totalAmount = foundSlots.length * roomData.pricePerSlot;

    // Create the new booking
    const newBooking = new BookingModel({
        room,
        slots,
        user: user._id,  // Always use authenticated user's ID
        date,
        totalAmount,
        isConfirmed: 'unconfirmed',
        isDeleted: false
    });

    await newBooking.save();

    // Mark slots as booked
    await SlotModel.updateMany({ _id: { $in: slots } }, { isBooked: true });

    // Populate related fields by re-fetching
    const savedBooking = await BookingModel.findById(newBooking._id)
        .populate('room')
        .populate('slots')
        .populate('user');
    
    if (!savedBooking) {
        throw new AppError(500, 'Failed to fetch saved booking details');
    }

    return savedBooking.toObject();
};
;

const getAllBookings = async () => {
    const bookings = await BookingModel.find({ isDeleted: false }) // Exclude deleted bookings
        .populate('room')
        .populate('slots')
        .populate('user')
        .lean();
    
    if (!bookings || bookings.length === 0) {
        throw new NoDataFoundError('No bookings found');
    }

    return bookings;
};

const getUserBookings = async (userId: mongoose.Types.ObjectId) => {
    const bookings = await BookingModel.find({ user: userId, isDeleted: false }) // Exclude deleted bookings
        .populate('room')
        .populate('slots')
        .populate('user')
        .lean();
    
    if (!bookings || bookings.length === 0) {
        throw new NoDataFoundError('No bookings found for the user');
    }

    return bookings;
};

const updateBooking = async (bookingId: string, updateData: Partial<IBooking>) => {
    const booking = await BookingModel.findByIdAndUpdate(bookingId, updateData, {
        new: true,
        runValidators: true
    }).populate('room').populate('slots').populate('user');

    if (!booking) {
        throw new AppError(404, 'Booking not found');
    }

    return booking.toObject();
};

const deleteBooking = async (bookingId: string) => {
    const booking = await BookingModel.findByIdAndUpdate(
        bookingId,
        { isDeleted: true },
        { new: true }
    ).populate('room').populate('slots').populate('user');

    if (!booking) {
        throw new AppError(404, 'Booking not found');
    }

    return booking.toObject();
};

export const BookingServices = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBooking,
    deleteBooking
};
