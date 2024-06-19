

import AppError from './AppError';

class NoDataFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
    this.name = 'NoDataFoundError';
  }
}

export default NoDataFoundError;

