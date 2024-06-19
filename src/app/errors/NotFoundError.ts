// src/app/errors/NoDataFoundError.ts
import AppError from './AppError';

class NoDataFoundError extends AppError {
    constructor(message: string = 'No Data Found') {
        super(404, message, false, [], false);
    }
}

export default NoDataFoundError;
