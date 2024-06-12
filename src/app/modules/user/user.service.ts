import { IUser } from "./user.interface";
import UserModel from "./user.model";


export const createUser = async (user: IUser) => {
    try {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser.toObject();
    } catch (error: any) {
        throw new Error(`Unable to create user: ${error.message}`);
    }
};
