// src/app/errors/CastError.ts
import AppError from './AppError';

class CastError extends AppError {
    constructor(message: string) {
        super(400, message, false);
    }
}

export default CastError;
