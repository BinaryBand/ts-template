/**
 * Common type definitions for the application
 */

export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

export type ConfigValue = string | number | boolean;

export interface Logger {
  info(message: string, meta?: any): void;
  error(message: string, error?: Error): void;
  debug(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
}

export interface AppConfig {
  nodeEnv: string;
  secretKey?: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// Legacy type alias - can be removed if not needed
export type CustomString = string;
