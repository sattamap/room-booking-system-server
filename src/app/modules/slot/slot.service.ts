import SlotModel from './slot.model';
import { ISlot } from './slot.interface';

export const createSlots = async (slotData: ISlot) => {
    const { room, date, startTime, endTime } = slotData;
    const slotDuration = 60; // in minutes

    // Parse startTime and endTime into minutes
    const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

    const totalDuration = endMinutes - startMinutes;
    const numOfSlots = totalDuration / slotDuration;

    const slots = [];

    for (let i = 0; i < numOfSlots; i++) {
        const slotStartMinutes = startMinutes + (i * slotDuration);
        const slotEndMinutes = slotStartMinutes + slotDuration;

        const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(2, '0')}:${String(slotStartMinutes % 60).padStart(2, '0')}`;
        const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, '0')}:${String(slotEndMinutes % 60).padStart(2, '0')}`;

        const newSlot = new SlotModel({
            room,
            date,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isBooked: false
        });

        await newSlot.save();
        slots.push(newSlot.toObject());
    }

    return slots;
};
