// src/app/errors/AppError.ts
class AppError extends Error {
  statusCode: number;
  includeData: boolean;
  errorMessages: { path: string; message: string }[];
  showDetails: boolean; // New parameter to control details

  constructor(statusCode: number, message: string, includeData: boolean = false, errorMessages: { path: string; message: string }[] = [], showDetails: boolean = true) {
      super(message);
      this.statusCode = statusCode;
      this.includeData = includeData;
      this.errorMessages = errorMessages;
      this.showDetails = showDetails; // Set showDetails
      Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
