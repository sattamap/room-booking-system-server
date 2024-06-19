
import AppError from './AppError';

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
