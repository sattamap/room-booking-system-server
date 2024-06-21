import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required." }),
    password: z.string().nonempty({ message: "Password is required" }),
  }),
});

// Middleware to validate request using a Zod schema
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };
};

export const AuthValidation = {
  loginValidationSchema,
};
