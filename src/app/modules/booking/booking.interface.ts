// booking.interface.ts

import mongoose from 'mongoose';

export interface IBooking {
    room: mongoose.Types.ObjectId;       // Reference to the Room document
    slots: mongoose.Types.ObjectId[];    // Array of references to Slot documents
    user: mongoose.Types.ObjectId;       // Reference to the User document
    date: Date;                          // Date of the booking
    totalAmount: number;                 // Total amount for the booking
    isConfirmed: 'confirmed' | 'unconfirmed' | 'canceled'; // Booking status
    isDeleted: boolean;                  // Indicates if the booking is marked as deleted
}
