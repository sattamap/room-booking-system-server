


import AppError from './AppError';

class DuplicateEntryError extends AppError {
  constructor(message: string) {
    super(409, message);
    this.name = 'MongoServerError';
  }
}

export default DuplicateEntryError;

  