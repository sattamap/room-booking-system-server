// src/app/utils/sendResponse.ts
import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  token?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    ...data.token && { token: data.token }, // Conditionally include token if it exists
    data: data.data,
  };

  res.status(data.statusCode).json(response);
};

export default sendResponse;
