import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBooking } from './booking.interface';

interface IBookingDocument extends IBooking, Document {}

const BookingSchema: Schema<IBookingDocument> = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], default: 'unconfirmed' },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

const BookingModel: Model<IBookingDocument> = mongoose.model<IBookingDocument>('Booking', BookingSchema);
export default BookingModel;
