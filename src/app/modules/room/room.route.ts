import { Router } from "express";
import { RoomControllers } from "./room.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validate from "../../middlewares/validate";
import {
  createRoomSchema,
  updateRoomSchema,
  roomIdSchema,
} from "./room.validation";

const router = Router();

// Route for creating a new room (Admin only)
router.post(
  "/rooms",
  auth(USER_ROLE.admin),
  validate(createRoomSchema),
  RoomControllers.addRoom,
);

// Route for retrieving a room by ID
router.get("/rooms/:id", validate(roomIdSchema), RoomControllers.getRoom);

// Route for retrieving all rooms
router.get("/rooms", RoomControllers.getAllRooms);

// Route for updating a room by ID (Admin only)
router.put(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  validate(roomIdSchema),
  validate(updateRoomSchema),
  RoomControllers.updateRoom,
);

// Route for deleting (soft deleting) a room by ID (Admin only)
router.delete(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  validate(roomIdSchema),
  RoomControllers.deleteRoom,
);

export const roomRoutes = router;
