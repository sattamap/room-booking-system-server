import { z } from "zod";
import { USER_ROLE } from "./user.constant";

// Typecast Object.values(USER_ROLE) to ensure it matches the expected type
const userRoles = Object.values(USER_ROLE) as [string, ...string[]];

// Schema for creating a user
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    address: z.string().min(1, "Address is required"),
    role: z.enum(userRoles).default(USER_ROLE.user),
  }),
});
