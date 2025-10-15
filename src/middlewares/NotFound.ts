import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle unknown or non-existing routes
 */
const routeNotFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ msg: "Route not found" });
};

export default routeNotFound;
