import { Request, Response } from 'express';
import { createUser } from './user.service';

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        
        // Construct the response object with _id as the first field in data
        const responseData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            address: user.address
        };

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User registered successfully',
            data: responseData
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
