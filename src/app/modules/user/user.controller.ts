import { Request, Response } from 'express';
import { createUser } from './user.service';

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User registered successfully',
            data: user // Directly use user as it does not include the password
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
