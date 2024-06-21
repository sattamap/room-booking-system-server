import express from "express";
import { AuthControllers } from "./auth.controller";
import { AuthValidation, validateRequest } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const authRoutes = router;
