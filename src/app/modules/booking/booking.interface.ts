// import { Document, Types } from 'mongoose';

// // Interface to describe the booking document
// export interface IBooking {
//     room: Types.ObjectId; // Reference to Room model
//     slots: Types.ObjectId[]; // Array of slot IDs
//     user: Types.ObjectId; // Reference to User model
//     date: Date;
//     totalAmount: number;
//     isConfirmed: 'confirmed' | 'unconfirmed' | 'canceled';
//     isDeleted: boolean;
// }

// // Extend Document to include MongoDB's built-in properties and methods
// export interface IBookingDocument extends IBooking, Document {}

// // Optional: Add other interfaces or helper types as needed

import { Document, ObjectId } from 'mongoose';

// Room Interface
export interface IRoom extends Document {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    isDeleted: boolean;
}

// User Interface
export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
}

// Slot Interface
export interface ISlot extends Document {
    room: IRoom | ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

// Booking Interface
export interface IBooking extends Document {
    date: Date;
    slots: ISlot[];  // Array of Slot objects
    room: IRoom | ObjectId; // Populated or just ObjectId
    user: IUser | ObjectId; // Populated or just ObjectId
    totalAmount: number;
    isConfirmed: 'unconfirmed' | 'confirmed';
    isDeleted: boolean;
}

