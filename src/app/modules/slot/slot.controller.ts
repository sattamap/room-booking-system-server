import { Request, Response } from 'express';
import { createSlots } from './slot.service';

const addSlots = async (req: Request, res: Response) => {
    try {
        const slots = await createSlots(req.body);
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

export const SlotControllers = {
    addSlots
};
