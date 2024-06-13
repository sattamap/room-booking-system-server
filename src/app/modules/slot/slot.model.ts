import mongoose, { Schema } from 'mongoose';
import { ISlot } from './slot.interface';

const SlotSchema: Schema = new Schema<ISlot>({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, // Use Schema.Types.ObjectId
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false }
}, {
    timestamps: true
});

export default mongoose.model<ISlot>('Slot', SlotSchema);
