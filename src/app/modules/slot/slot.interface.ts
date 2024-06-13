import mongoose from 'mongoose';

export interface ISlot {
    room: mongoose.Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}
