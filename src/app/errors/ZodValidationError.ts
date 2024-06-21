import { ZodError } from "zod";
import AppError from "./AppError";

class ZodValidationError extends AppError {
  constructor(error: ZodError) {
    // Map ZodError issues to your error response format
    const errorMessages = error.errors.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    super(400, "Zod Validation error", errorMessages);
    this.name = "ZodValidationError";
  }
}

export default ZodValidationError;
