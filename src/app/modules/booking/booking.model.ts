// booking.model.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBooking } from './booking.interface';

// Extend the interface with Document to include MongoDB's built-in properties and methods
interface IBookingDocument extends IBooking, Document {}

// Define the schema for the Booking model
const BookingSchema: Schema<IBookingDocument> = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], default: 'unconfirmed' },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create and export the model
const BookingModel: Model<IBookingDocument> = mongoose.model<IBookingDocument>('Booking', BookingSchema);
export default BookingModel;
