import { Request, Response } from 'express';
import { createRoom } from './room.service';

export const addRoom = async (req: Request, res: Response) => {
    try {
        const room = await createRoom(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Room added successfully',
            data: room
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error adding room',
            error: error.message
        });
    }
};
