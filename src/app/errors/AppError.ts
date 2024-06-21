class AppError extends Error {
  statusCode: number;
  errorMessages: { path: string; message: string }[];

  constructor(
    statusCode: number,
    message: string,
    errorMessages: { path: string; message: string }[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
