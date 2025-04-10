const winston = require('winston');
const { combine, timestamp, printf, colorize, errors } = winston.format;
const path = require('path');

// Define log severity levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Colorize log levels for development
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};
winston.addColors(colors);

// Custom log format
const devFormat = printf(({ level, message, timestamp, stack }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (stack) log += `\n${stack}`; // Include stack trace for errors
  return log;
});

const prodFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create logger instance
const logger = winston.createLogger({
  levels,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Include stack traces for errors
    process.env.NODE_ENV === 'development' 
      ? combine(colorize(), devFormat)
      : prodFormat
  ),
  transports: [
    new winston.transports.Console(),
    // Optional file transport (uncomment to enable)
    /*
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 3
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 2
    })
    */
  ],
  exitOnError: false
});

// Add stream for morgan HTTP logging
logger.stream = {
  write: (message) => logger.http(message.trim())
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});

module.exports = logger;