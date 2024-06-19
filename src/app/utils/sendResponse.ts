// src/app/utils/sendResponse.ts
import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T; // Make data optional
  token?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
  };

  if (data.data !== undefined) {
    response.data = data.data;
  }

  if (data.token) {
    response.token = data.token;
  }

  res.status(data.statusCode).json(response);
};

export default sendResponse;
