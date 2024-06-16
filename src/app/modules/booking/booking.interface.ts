import mongoose from 'mongoose';

export interface IBooking {
    room: mongoose.Types.ObjectId;
    slots: mongoose.Types.ObjectId[];
    user: mongoose.Types.ObjectId;
    date: Date;
    totalAmount: number;
    isConfirmed: 'confirmed' | 'unconfirmed' | 'canceled';
    isDeleted: boolean;
}
