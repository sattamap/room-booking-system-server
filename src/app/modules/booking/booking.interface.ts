import { Document, ObjectId } from "mongoose";

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
  slots: ISlot[]; // Array of Slot objects
  room: IRoom | ObjectId; // Populated or just ObjectId
  user: IUser | ObjectId; // Populated or just ObjectId
  totalAmount: number;
  isConfirmed: "unconfirmed" | "confirmed";
  isDeleted: boolean;
}
