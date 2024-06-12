import RoomModel from './room.model';
import { IRoom } from './room.interface';

const createRoom = async (roomData: IRoom) => {
    try {
        const newRoom = new RoomModel(roomData);
        await newRoom.save();
        // Use .toObject() to convert to a plain object and exclude fields
        const roomObject = newRoom.toObject();
        const { _id, name, roomNo, floorNo, capacity, pricePerSlot, amenities, isDeleted } = roomObject;
        return { _id, name, roomNo, floorNo, capacity, pricePerSlot, amenities, isDeleted };
    } catch (error: any) {
        throw new Error(`Unable to create room: ${error.message}`);
    }
};

const getRoomById = async (roomId: string) => {
    try {
        const room = await RoomModel.findById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }
        const roomObject = room.toObject();
        const { _id, name, roomNo, floorNo, capacity, pricePerSlot, amenities, isDeleted } = roomObject;
        return { _id, name, roomNo, floorNo, capacity, pricePerSlot, amenities, isDeleted };
    } catch (error: any) {
        throw new Error(`Unable to retrieve room: ${error.message}`);
    }
};

export const RoomServices = {
    createRoom,
    getRoomById
};
