
import RoomModel from './room.model';
import { IRoom } from './room.interface';

export const createRoom = async (roomData: IRoom) => {
    try {
        const newRoom = new RoomModel(roomData);
        await newRoom.save();
        return newRoom.toObject();
    } catch (error: any) {
        throw new Error(`Unable to create room: ${error.message}`);
    }
};
