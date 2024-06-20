// src/app/modules/room/room.validation.ts
import { z } from 'zod';

// Schema for creating a room
export const createRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    roomNo: z.number().min(1, 'Room number must be greater than 0'),
    floorNo: z.number().min(0, 'Floor number must be non-negative'),
    capacity: z.number().min(1, 'Capacity must be at least 1'),
    pricePerSlot: z.number().min(0, 'Price per slot must be non-negative'),
    amenities: z.array(z.string().min(1, 'Amenity must be a non-empty string')).nonempty('At least one amenity is required'),
    isDeleted: z.boolean().optional()
  })
});

// Schema for updating a room
export const updateRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    roomNo: z.number().min(1, 'Room number must be greater than 0').optional(),
    floorNo: z.number().min(0, 'Floor number must be non-negative').optional(),
    capacity: z.number().min(1, 'Capacity must be at least 1').optional(),
    pricePerSlot: z.number().min(0, 'Price per slot must be non-negative').optional(),
    amenities: z.array(z.string().min(1, 'Amenity must be a non-empty string')).optional(),
    isDeleted: z.boolean().optional()
  })
});

// Schema for room ID parameter
export const roomIdSchema = z.object({
  params: z.object({
    id: z.string().length(24, 'Invalid Room ID')
  })
});
