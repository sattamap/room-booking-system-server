// src/app/modules/user/user.controller.ts
import { Request, Response } from 'express';
import { createUser } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { createUserSchema } from './user.validation'; // Import Zod schema for user creation
import catchAsync from '../../utils/catchAsync';

export const signup = catchAsync(async (req: Request, res: Response) => {
    // Validate request body against createUserSchema
    await createUserSchema.parseAsync(req.body);  // Validate request body

    const user = await createUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: user,
    });
});
