import mongoose, { Schema, Document, Model } from 'mongoose';
import { IRoom } from './room.interface';

interface IRoomDocument extends IRoom, Document {}

// Define the schema
const RoomSchema: Schema<IRoomDocument> = new Schema({
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true // Add timestamps for createdAt and updatedAt fields
});

// Define and export the model
const RoomModel: Model<IRoomDocument> = mongoose.model<IRoomDocument>('Room', RoomSchema);
export default RoomModel;
