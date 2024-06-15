import { Request, Response } from 'express';
import { SlotServices } from './slot.service';

const createSlot = async (req: Request, res: Response) => {
    try {
        const slots = await SlotServices.createSlots(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Slots created successfully',
            data: slots
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error creating slots',
            error: error.message
        });
    }
};

const getAvailableSlots = async (req: Request, res: Response) => {
    try {
        const { date, roomId } = req.query;
        const availableSlots = await SlotServices.getAvailableSlots(date as string, roomId as string);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Available slots retrieved successfully',
            data: availableSlots
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error retrieving available slots',
            error: error.message
        });
    }
};

export const SlotControllers = {
    createSlot,
    getAvailableSlots
};
