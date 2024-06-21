import RoomModel from "./room.model";
import { IRoom } from "./room.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import NoDataFoundError from "../../errors/NotFoundError";

const createRoom = async (roomData: IRoom) => {
  const newRoom = new RoomModel(roomData);
  await newRoom.save();
  return newRoom.toObject();
};

const getRoomById = async (roomId: string) => {
  const room = await RoomModel.findById(roomId);
  if (!room) {
    throw new NoDataFoundError("No Data Found");
  }
  return room.toObject();
};

const getAllRooms = async () => {
  const rooms = await RoomModel.find({ isDeleted: false });
  if (rooms.length === 0) {
    throw new NoDataFoundError("No rooms found");
  }
  return rooms.map((room) => room.toObject());
};

const updateRoomById = async (roomId: string, updateData: Partial<IRoom>) => {
  const updatedRoom = await RoomModel.findByIdAndUpdate(roomId, updateData, {
    new: true,
  });
  if (!updatedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }
  return updatedRoom.toObject();
};

const deleteRoomById = async (roomId: string) => {
  const deletedRoom = await RoomModel.findByIdAndUpdate(
    roomId,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }
  return deletedRoom.toObject();
};

export const RoomServices = {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoomById,
  deleteRoomById,
};
