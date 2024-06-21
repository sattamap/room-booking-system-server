import UserModel from "./user.model";
import { IUser } from "./user.interface";
import { MongoServerError } from "mongodb";
import DuplicateEntryError from "../../errors/DuplicateEntryError";
import ValidationError from "../../errors/ValidationError";
import CastError from "../../errors/CastError";
import mongoose from "mongoose";

export const createUser = async (user: IUser) => {
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    const { _id, name, email, phone, role, address } = newUser.toObject();
    return { _id, name, email, phone, role, address };
  } catch (error: any) {
    if (error instanceof MongoServerError && error.code === 11000) {
      throw new DuplicateEntryError(`${error.message}`);
    }

    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map((e) => ({
        path: e.path,
        message: e.message,
      }));
      throw new ValidationError(`${error.message}`, errorMessages);
    }

    if (error instanceof mongoose.Error.CastError) {
      const errorMessages = [
        { path: error.path, message: `${error.path}: ${error.value}` },
      ];
      throw new CastError(`${error.message}`, errorMessages);
    }

    throw new Error(error.message);
  }
};
