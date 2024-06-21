import { Request, Response } from "express";
import { createUser } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});
