import mongoose from "mongoose";

export interface ISlot {
  _id?: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId | IRoom; // room could be an ObjectId or a populated IRoom
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IRoom {
  _id: mongoose.Types.ObjectId;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
}
