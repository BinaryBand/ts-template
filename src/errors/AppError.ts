/**
 * Simple custom error class for application-specific errors
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string = 'UNKNOWN', statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

/**
 * Creates a validation error
 */
export function createValidationError(message: string): AppError {
  return new AppError(message, 'VALIDATION_ERROR', 400);
}

/**
 * Creates a not found error
 */
export function createNotFoundError(message: string): AppError {
  return new AppError(message, 'NOT_FOUND', 404);
}
