// src/app/errors/ValidationError.ts
import AppError from './AppError';

class ValidationError extends AppError {
    constructor(message: string, errors: { path: string, message: string }[]) {
        super(400, message, true, errors);
    }
}

export default ValidationError;
