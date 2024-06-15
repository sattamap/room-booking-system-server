import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Login user controller using catchAsync and sendResponse
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { token, user } = await AuthServices.loginUser({ email, password });

  sendResponse(res, {
    statusCode: 200,  // Use 200 OK status for successful login
    success: true,
    message: 'User logged in successfully',
    token,
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
};
