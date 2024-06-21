import { Request, Response, NextFunction } from "express";
import { SlotServices } from "./slot.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { isPopulatedRoom } from "../../utils/typeGuards";

const createSlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const slots = await SlotServices.createSlots(req.body);

      // Map the slots to the desired response format
      const formattedSlots = slots.map((slot) => ({
        _id: slot._id.toString(),
        room: slot.room.toString(), // Assuming room is stored as ObjectId
        date: slot.date.toISOString().slice(0, 10), // Format date to 'YYYY-MM-DD'
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      }));

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Slots created successfully",
        data: formattedSlots,
      });
    } catch (error) {
      if (error instanceof AppError) {
        sendResponse(res, {
          success: false,
          statusCode: error.statusCode,
          message: error.message,
          data: null,
        });
      } else {
        next(error);
      }
    }
  },
);

const getAvailableSlots = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date, roomId } = req.query;
      const availableSlots = await SlotServices.getAvailableSlots(
        date as string,
        roomId as string,
      );

      // Format the slots to include room details
      const formattedSlots = availableSlots.map((slot) => {
        if (isPopulatedRoom(slot.room)) {
          return {
            _id: slot._id.toString(), // Ensure _id is a string
            room: {
              _id: slot.room._id.toString(),
              name: slot.room.name,
              roomNo: slot.room.roomNo,
              floorNo: slot.room.floorNo,
              capacity: slot.room.capacity,
              pricePerSlot: slot.room.pricePerSlot,
              amenities: slot.room.amenities,
              isDeleted: slot.room.isDeleted,
            },
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: slot.isBooked,
          };
        } else {
          return {
            _id: slot._id.toString(),
            room: slot.room.toString(), // If room is not populated, keep it as ObjectId
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: slot.isBooked,
          };
        }
      });

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Available slots retrieved successfully",
        data: formattedSlots,
      });
    } catch (error) {
      if (error instanceof AppError) {
        sendResponse(res, {
          success: false,
          statusCode: error.statusCode,
          message: error.message,
          data: null,
        });
      } else {
        next(error);
      }
    }
  },
);

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
};
