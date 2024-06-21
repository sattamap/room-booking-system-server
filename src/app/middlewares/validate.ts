import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors
          .map((err) => err.message)
          .join(", ");
        next(
          new AppError(
            httpStatus.BAD_REQUEST,
            `Validation Error: ${formattedErrors}`,
          ),
        );
      } else {
        next(new AppError(httpStatus.BAD_REQUEST, "Validation failed"));
      }
    }
  };
};

export default validate;
