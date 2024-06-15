import bcrypt from 'bcrypt';
import config from '../../config';
import UserModel from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


// Login user function
const loginUser = async (payload: TLoginUser) => {
  // Check if the user exists by email
  const user = await UserModel.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Verify password
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Create JWT payload
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // Create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expires as string,
  );

  // Prepare the response data
  const { _id, name, phone, role, address } = user.toObject();
  return {
    token: accessToken,
    user: {
      _id,
      name,
      email: user.email,
      phone,
      role,
      address,
    },
  };
};

export const AuthServices = {
  loginUser,
};
