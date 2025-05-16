// src/app.ts
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
// import AppError from "./utils/appError";
import config from "./config";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./api/middlewares";
import apiRoutes from "./api/routes"; // Import API routes

const app = express();

// Apply server configuration
if (config.server.trustProxy) {
  app.set('trust proxy', 1);
}

// Apply middleware
app.use(helmet({
  contentSecurityPolicy: config.server.helmet.contentSecurityPolicy,
  xssFilter: config.server.helmet.xssFilter,
  noSniff: config.server.helmet.noSniff,
  referrerPolicy: config.server.helmet.referrerPolicy
}));

app.use(cors({
  origin: config.server.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: config.server.bodyLimit }));
app.use(morgan("dev"));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    environment: config.server.env,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use(config.server.apiPrefix, apiRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;