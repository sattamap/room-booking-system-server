import { Request, Response } from 'express';
import { RoomServices } from './room.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const addRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomServices.createRoom(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: room
  });
});

const getRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomServices.getRoomById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: room
  });
});

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const rooms = await RoomServices.getAllRooms();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: rooms
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomServices.updateRoomById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: room
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomServices.deleteRoomById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: room
  });
});

export const RoomControllers = {
  addRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom
};
