// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate =
  (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: details,
      });
    }

    next();
  };
