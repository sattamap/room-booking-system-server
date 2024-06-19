

import AppError from './AppError';

class ValidationError extends AppError {
  constructor(message: string, errorMessages: { path: string; message: string }[]) {
    super(400, message);
    this.name = 'MongoServerError';
    this.errorMessages = errorMessages;
  }
}

export default ValidationError;

  