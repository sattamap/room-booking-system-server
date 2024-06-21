import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status"; // Import httpStatus
import AppError from "../../errors/AppError";

// Login user controller using catchAsync and sendResponse
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await AuthServices.loginUser({ email, password });

    sendResponse(res, {
      statusCode: httpStatus.OK, // Use httpStatus for status code
      success: true,
      message: "User logged in successfully",
      token,
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR, // Use httpStatus for status code
        success: false,
        message: "An unexpected error occurred",
        data: null,
      });
    }
  }
});

export const AuthControllers = {
  loginUser,
};
