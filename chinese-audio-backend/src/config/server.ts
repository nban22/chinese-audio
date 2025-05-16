import dotenv from 'dotenv';
dotenv.config();

export const server = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api',
  host: process.env.HOST || 'localhost',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  apiTimeout: parseInt(process.env.API_TIMEOUT || '30000', 10), // 30 seconds
  bodyLimit: process.env.BODY_LIMIT || '5mb',
  trustProxy: process.env.TRUST_PROXY === 'true',
  helmet: {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
    xssFilter: true,
    noSniff: true,
    referrerPolicy: true,
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  },
};

export default server;