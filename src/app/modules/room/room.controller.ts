import { Request, Response } from 'express';
import { RoomServices } from './room.service';

const addRoom = async (req: Request, res: Response) => {
    try {
        const room = await RoomServices.createRoom(req.body);
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

const getRoom = async (req: Request, res: Response) => {
    try {
        const room = await RoomServices.getRoomById(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Room retrieved successfully',
            data: room
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error retrieving room',
            error: error.message
        });
    }
};

const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await RoomServices.getAllRooms();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Rooms retrieved successfully',
            data: rooms
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error retrieving rooms',
            error: error.message
        });
    }
};

export const RoomControllers = {
    addRoom,
    getRoom,
    getAllRooms
};
