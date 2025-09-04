/**
 * Common type definitions for the application
 */

import type { Result } from './utils';

// Re-export commonly used utility types
export type { Result };

export type ConfigValue = string | number | boolean;

// Strict logger interface without any types
export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: Error): void;
  debug(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
}

export interface AppConfig {
  nodeEnv: string;
  secretKey: string | undefined;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// Typed metadata interfaces for different error types
export interface ValidationErrorMeta {
  field?: string;
  value?: string | number | boolean;
  constraint?: string;
}

export interface NotFoundErrorMeta {
  resourceType: string;
  resourceId: string | number;
  searchParams?: Record<string, string | number>;
}

export interface AuthenticationErrorMeta {
  authMethod?: 'token' | 'basic' | 'oauth' | 'session';
  userId?: string;
  reason?: 'expired' | 'invalid' | 'missing';
}

export interface AuthorizationErrorMeta {
  userId: string;
  resource: string;
  action: string;
  requiredPermissions?: string[];
}

export interface ConflictErrorMeta {
  resourceType: string;
  conflictingField: string;
  existingValue: string | number;
}

export interface DatabaseErrorMeta {
  operation: 'select' | 'insert' | 'update' | 'delete' | 'connect';
  table?: string;
  constraint?: string;
}

export interface ExternalServiceErrorMeta {
  serviceName: string;
  endpoint?: string;
  statusCode?: number;
  responseTime?: number;
}

export interface TimeoutErrorMeta {
  operation: string;
  timeoutMs: number;
  elapsedMs?: number;
}

export interface ConfigurationErrorMeta {
  configKey: string;
  expectedType?: string;
  actualValue?: string;
}

export interface RateLimitErrorMeta {
  limit: number;
  windowMs: number;
  retryAfterMs?: number;
}
