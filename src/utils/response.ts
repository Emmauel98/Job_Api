import { Response } from "express";

/**
 * Standard success response
 */
export const successResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
  message: string = "Success"
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard error response
 */
export const errorResponse = (
  res: Response,
  error: any,
  statusCode: number = 500
) => {
  console.error("[ERROR]", error);

  let message = "Internal Server Error";

  // Handle different error types gracefully
  if (error.name === "ValidationError") {
    message = error.message;
    statusCode = 400;
  } else if (error.name === "CastError") {
    message = "Invalid ID format";
    statusCode = 400;
  } else if (error.message) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined,
  });
};
