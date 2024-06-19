import { Request, Response, NextFunction } from 'express';
import { SlotServices } from './slot.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import NoDataFoundError from '../../errors/NotFoundError';

const createSlot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const slots = await SlotServices.createSlots(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: slots
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { date, roomId } = req.query;
  const availableSlots = await SlotServices.getAvailableSlots(date as string, roomId as string);

  // Since `getAvailableSlots` function already throws `NoDataFoundError` if no slots are found,
  // no need for additional check here.
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: availableSlots
  });
});

export const SlotControllers = {
  createSlot,
  getAvailableSlots
};
