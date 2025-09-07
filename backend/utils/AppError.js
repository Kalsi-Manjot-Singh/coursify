export default class AppError extends Error {
  constructor(message, statusCode, isOperational = true, details = null) {
    super(message);
    this.success = false;
    this.statusCode = statusCode || 500;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
