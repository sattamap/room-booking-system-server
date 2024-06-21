import mongoose, { Schema, Document, Model } from "mongoose";
import { IBooking, IRoom, IUser } from "./booking.interface";

interface IBookingDocument extends IBooking, Document {}

const BookingSchema: Schema<IBookingDocument> = new Schema(
  {
    date: { type: Date, required: true },
    slots: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    ],
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: {
      type: String,
      enum: ["unconfirmed", "confirmed"],
      default: "unconfirmed",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt fields
  },
);

const BookingModel: Model<IBookingDocument> = mongoose.model<IBookingDocument>(
  "Booking",
  BookingSchema,
);
export default BookingModel;
