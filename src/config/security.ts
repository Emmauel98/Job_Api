import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { Application  } from "express";

export const setupSecurity = (app: Application ) => {
  // Add Helmet for secure headers
  app.use(helmet());

  // Enable CORS
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "*", // restrict in production
      credentials: true,
    })
  );

  // Enable gzip compression for faster responses
  app.use(compression());
};
