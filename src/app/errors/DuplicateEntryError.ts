// src/app/errors/DuplicateEntryError.ts
import AppError from './AppError';

class DuplicateEntryError extends AppError {
    constructor(message: string) {
        super(409, message, false);
    }
}

export default DuplicateEntryError;
