import { Request, Response } from 'express';
import { createUser } from './user.service';

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        const { password, ...userData } = user; // Exclude password from response
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User registered successfully',
            data: userData
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error registering user',
            error: error.message
        });
    }
};
