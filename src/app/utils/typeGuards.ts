// import { ObjectId } from 'mongoose';
// import { IRoom } from '../modules/room/room.interface';
// import { IUser } from '../modules/user/user.interface';

// // Type guard for populated room
// export function isPopulatedRoom(room: any): room is IRoom {
//     return room && typeof room === 'object' && '_id' in room && 'name' in room && 'roomNo' in room &&
//         'floorNo' in room && 'capacity' in room && 'pricePerSlot' in room && 'amenities' in room && 'isDeleted' in room;
// }

// // Type guard for populated user
// export function isPopulatedUser(user: any): user is IUser {
//     return user && typeof user === 'object' && '_id' in user && 'name' in user && 'email' in user && 
//         'phone' in user && 'address' in user && 'role' in user;
// }


import { IRoom, IUser } from '../modules/booking/booking.interface';

// Type guard for populated room
export function isPopulatedRoom(room: any): room is IRoom {
    return room && typeof room === 'object' &&
        'name' in room &&
        'roomNo' in room &&
        'floorNo' in room &&
        'capacity' in room &&
        'pricePerSlot' in room &&
        'amenities' in room &&
        'isDeleted' in room;
}

// Type guard for populated user
export function isPopulatedUser(user: any): user is IUser {
    return user && typeof user === 'object' &&
        'name' in user &&
        'email' in user &&
        'phone' in user &&
        'address' in user &&
        'role' in user;
}
