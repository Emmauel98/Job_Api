import express, { Application, Request, Response, NextFunction } from "express";
// import dotenv from "dotenv";
import "dotenv/config";
import routeNotFound from "../middlewares/NotFound";
import connectToDB from "../Database/db";
// import Userroute from "../routes/user";
// import JobListingroute from "../routes/job";
// import authentication from "../middlewares/authentication";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes";
import jobRoutes from "../routes/jobs.route";
import applicationRoutes from "../routes/application.routes";
import { setupSecurity } from "../config/security";
import { loginLimiter, aiLimiter } from "../middlewares/rateLimiter.middleware"

// Initialize environment variables
// dotenv.config();

export const app: Application = express();

setupSecurity(app);

// Parse JSON middleware
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// User route
app.use("/api/v1/userauth", loginLimiter, authRoutes);

// JobListing route 
app.use("/api/v1/job", jobRoutes);

// Application route 
app.use("/api/v1/apply", applicationRoutes);

// router.post("/ai/generate-job-description", aiLimiter, aiController);

// Middleware for unknown routes
app.use(routeNotFound);

// Port configuration
const PORT: number = Number(process.env.PORT) || 3007;

// Start server
const start = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await connectToDB(mongoUri);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error: any) {
    console.error("Error starting server:", error.message);
  }
};

start();
