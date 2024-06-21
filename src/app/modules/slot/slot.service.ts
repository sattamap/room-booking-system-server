// src/services/slot.service.ts
import SlotModel from './slot.model';
import { ISlot } from './slot.interface';
import mongoose from 'mongoose';
import NoDataFoundError from '../../errors/NotFoundError';
import RoomModel from '../room/room.model';
import AppError from '../../errors/AppError';

const createSlots = async (slotData: ISlot) => {
  const { room, date, startTime, endTime } = slotData;

  // Check if the room exists
  const existingRoom = await RoomModel.findById(room);
  if (!existingRoom) {
    throw new AppError(400, 'Room does not exist');
  }

  const slotDuration = 60; // in minutes

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

const getAvailableSlots = async (date?: string, roomId?: string) => {
  const query: { date?: string; room?: mongoose.Types.ObjectId; isBooked: boolean } = { isBooked: false };

  if (date) query.date = date;
  if (roomId) query.room = new mongoose.Types.ObjectId(roomId);

  const availableSlots = await SlotModel.find(query)
    .populate({
      path: 'room',
      select: '_id name roomNo floorNo capacity pricePerSlot amenities isDeleted'
    })
    .lean()
    .exec();

  if (availableSlots.length === 0) {
    throw new NoDataFoundError('No available slots found');
  }
  return availableSlots;
};

export const SlotServices = {
  createSlots,
  getAvailableSlots
};
