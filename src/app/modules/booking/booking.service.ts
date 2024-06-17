// src/app/modules/booking/booking.service.ts
import BookingModel from './booking.model';
import SlotModel from '../slot/slot.model';
import RoomModel from '../room/room.model';  // Import the Room model
import { IBooking } from './booking.interface';

import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const createBooking = async (bookingData: IBooking, user: { _id: mongoose.Types.ObjectId }) => {
    const { room, slots, date } = bookingData;

    // Validate that slots exist and are available
    const foundSlots = await SlotModel.find({ _id: { $in: slots }, isBooked: false });
    if (foundSlots.length !== slots.length) {
        throw new AppError(400, 'One or more slots are already booked or do not exist');
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
        user: user._id,
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
    
    return savedBooking;
};

export const BookingServices = {
    createBooking,
};
