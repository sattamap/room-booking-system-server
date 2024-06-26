import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  token?: string; // Ensure token is defined
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token, // Ensure token is included in the response object
    data: data.data !== undefined ? data.data : null, // Ensure data is included or set to null
  };

  res.status(data.statusCode).json(response);
};

export default sendResponse;
