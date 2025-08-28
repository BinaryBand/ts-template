import {
  ValidationErrorMeta,
  NotFoundErrorMeta,
  AuthenticationErrorMeta,
  AuthorizationErrorMeta,
  ConflictErrorMeta,
  DatabaseErrorMeta,
  ExternalServiceErrorMeta,
  TimeoutErrorMeta,
  ConfigurationErrorMeta,
  RateLimitErrorMeta,
} from '@/types/common';

/**
 * Common error codes and their corresponding HTTP status codes
 */
export const ErrorCodes = {
  // Client errors (4xx)
  VALIDATION_ERROR: { code: 'VALIDATION_ERROR', status: 400 },
  AUTHENTICATION_ERROR: { code: 'AUTHENTICATION_ERROR', status: 401 },
  AUTHORIZATION_ERROR: { code: 'AUTHORIZATION_ERROR', status: 403 },
  NOT_FOUND: { code: 'NOT_FOUND', status: 404 },
  CONFLICT: { code: 'CONFLICT', status: 409 },
  RATE_LIMIT_EXCEEDED: { code: 'RATE_LIMIT_EXCEEDED', status: 429 },

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', status: 500 },
  SERVICE_UNAVAILABLE: { code: 'SERVICE_UNAVAILABLE', status: 503 },
  DATABASE_ERROR: { code: 'DATABASE_ERROR', status: 500 },
  EXTERNAL_SERVICE_ERROR: { code: 'EXTERNAL_SERVICE_ERROR', status: 502 },

  // Custom application errors
  CONFIGURATION_ERROR: { code: 'CONFIGURATION_ERROR', status: 500 },
  TIMEOUT_ERROR: { code: 'TIMEOUT_ERROR', status: 408 },
  UNKNOWN: { code: 'UNKNOWN', status: 500 },
} as const;

export type ErrorCode = keyof typeof ErrorCodes;

// Metadata type mapping for each error code
type ErrorMetadataMap = {
  VALIDATION_ERROR: ValidationErrorMeta;
  NOT_FOUND: NotFoundErrorMeta;
  AUTHENTICATION_ERROR: AuthenticationErrorMeta;
  AUTHORIZATION_ERROR: AuthorizationErrorMeta;
  CONFLICT: ConflictErrorMeta;
  DATABASE_ERROR: DatabaseErrorMeta;
  EXTERNAL_SERVICE_ERROR: ExternalServiceErrorMeta;
  TIMEOUT_ERROR: TimeoutErrorMeta;
  CONFIGURATION_ERROR: ConfigurationErrorMeta;
  RATE_LIMIT_EXCEEDED: RateLimitErrorMeta;
  INTERNAL_SERVER_ERROR: Record<string, never>; // No specific metadata
  SERVICE_UNAVAILABLE: Record<string, never>; // No specific metadata
  UNKNOWN: Record<string, never>; // No specific metadata
};

/**
 * Generic application error class with strict typing
 */
export class AppError<T extends ErrorCode = ErrorCode> extends Error {
  public readonly code: T;
  public readonly statusCode: number;
  public readonly metadata: ErrorMetadataMap[T] | undefined;

  constructor(message: string, errorCode: T, statusCode?: number, metadata?: ErrorMetadataMap[T]) {
    super(message);
    this.name = 'AppError';

    const predefined = ErrorCodes[errorCode];
    this.code = errorCode;
    this.statusCode = statusCode ?? predefined.status;
    this.metadata = metadata;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * Create a validation error with typed metadata
   */
  static validation(message: string, metadata?: ValidationErrorMeta): AppError<'VALIDATION_ERROR'> {
    return new AppError(message, 'VALIDATION_ERROR', undefined, metadata);
  }

  /**
   * Create a not found error with typed metadata
   */
  static notFound(message: string, metadata: NotFoundErrorMeta): AppError<'NOT_FOUND'> {
    return new AppError(message, 'NOT_FOUND', undefined, metadata);
  }

  /**
   * Create an authentication error with typed metadata
   */
  static authentication(message: string, metadata?: AuthenticationErrorMeta): AppError<'AUTHENTICATION_ERROR'> {
    return new AppError(message, 'AUTHENTICATION_ERROR', undefined, metadata);
  }

  /**
   * Create an authorization error with typed metadata
   */
  static authorization(message: string, metadata: AuthorizationErrorMeta): AppError<'AUTHORIZATION_ERROR'> {
    return new AppError(message, 'AUTHORIZATION_ERROR', undefined, metadata);
  }

  /**
   * Create a conflict error with typed metadata
   */
  static conflict(message: string, metadata: ConflictErrorMeta): AppError<'CONFLICT'> {
    return new AppError(message, 'CONFLICT', undefined, metadata);
  }

  /**
   * Create a database error with typed metadata
   */
  static database(message: string, metadata: DatabaseErrorMeta): AppError<'DATABASE_ERROR'> {
    return new AppError(message, 'DATABASE_ERROR', undefined, metadata);
  }

  /**
   * Create an external service error with typed metadata
   */
  static externalService(message: string, metadata: ExternalServiceErrorMeta): AppError<'EXTERNAL_SERVICE_ERROR'> {
    return new AppError(message, 'EXTERNAL_SERVICE_ERROR', undefined, metadata);
  }

  /**
   * Create a timeout error with typed metadata
   */
  static timeout(message: string, metadata: TimeoutErrorMeta): AppError<'TIMEOUT_ERROR'> {
    return new AppError(message, 'TIMEOUT_ERROR', undefined, metadata);
  }

  /**
   * Create a configuration error with typed metadata
   */
  static configuration(message: string, metadata: ConfigurationErrorMeta): AppError<'CONFIGURATION_ERROR'> {
    return new AppError(message, 'CONFIGURATION_ERROR', undefined, metadata);
  }

  /**
   * Create a rate limit error with typed metadata
   */
  static rateLimit(message: string, metadata: RateLimitErrorMeta): AppError<'RATE_LIMIT_EXCEEDED'> {
    return new AppError(message, 'RATE_LIMIT_EXCEEDED', undefined, metadata);
  }

  /**
   * Create internal server errors (no specific metadata required)
   */
  static internal(message: string): AppError<'INTERNAL_SERVER_ERROR'> {
    return new AppError(message, 'INTERNAL_SERVER_ERROR');
  }

  /**
   * Create service unavailable errors (no specific metadata required)
   */
  static serviceUnavailable(message: string): AppError<'SERVICE_UNAVAILABLE'> {
    return new AppError(message, 'SERVICE_UNAVAILABLE');
  }

  /**
   * Create unknown errors (no specific metadata required)
   */
  static unknown(message: string): AppError<'UNKNOWN'> {
    return new AppError(message, 'UNKNOWN');
  }

  /**
   * Create a custom error with specific status code and untyped metadata (fallback)
   */
  static custom(
    message: string,
    code: string,
    statusCode: number,
    metadata?: Record<string, string | number | boolean>
  ): AppError {
    const error = new AppError(message, 'UNKNOWN', statusCode, {});
    // Override the code for custom errors
    (error as { code: string }).code = code;
    (error as { metadata: Record<string, string | number | boolean> | undefined }).metadata = metadata;
    return error;
  }

  /**
   * Convert error to a plain object (useful for logging/serialization)
   */
  toObject(): {
    name: string;
    message: string;
    code: T;
    statusCode: number;
    metadata: ErrorMetadataMap[T] | undefined;
    stack: string | undefined;
  } {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      metadata: this.metadata,
      stack: this.stack,
    };
  }

  /**
   * Check if error is of a specific type
   */
  isType(errorCode: ErrorCode): boolean {
    return this.code === errorCode;
  }
}

/**
 * Check if an error is an AppError instance
 */
export function isAppError(error: Error): error is AppError {
  return error instanceof AppError;
}

/**
 * Convert any error to an AppError
 */
export function toAppError(error: Error | string): AppError {
  if (typeof error === 'string') {
    return AppError.unknown(error);
  }

  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return AppError.unknown(error.message);
  }

  return AppError.unknown('An unknown error occurred');
}
