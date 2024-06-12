// src/app/modules/room/room.interface.ts
export interface IRoom {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    isDeleted?: boolean; // Optional because default is false
}
