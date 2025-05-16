// backend/src/utils/logger.ts
import winston from 'winston';
import config from '../config';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define console format with colors
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaString = Object.keys(meta).length 
      ? `\n${JSON.stringify(meta, null, 2)}` 
      : '';
    return `${timestamp} ${level}: ${message}${metaString}`;
  })
);

// Create the logger instance
const logger = winston.createLogger({
  level: config.logging.level,
  format: logFormat,
  defaultMeta: { service: 'chinese-audio-api' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat
    }),
  ]
});

// Add file transport in production or if explicitly enabled
if (process.env.NODE_ENV === 'production' || config.logging.enableFile) {
  logger.add(
    new winston.transports.File({
      filename: config.logging.filePath,
      format: logFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Export default logger instance
export default logger;