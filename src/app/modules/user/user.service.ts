import UserModel from './user.model';
import { IUser } from './user.interface';

export const createUser = async (user: IUser) => {
    try {
        const newUser = new UserModel(user);
        await newUser.save();
        // Extract the specific fields to include in the response
        const { _id, name, email, phone, role, address } = newUser.toObject();
        return { _id, name, email, phone, role, address };
    } catch (error: any) {
        throw new Error(`Unable to create user: ${error.message}`);
    }
};
