import { config } from '@/config';

/**
 * Simple logging utility
 */
export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: Error): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

/**
 * Basic console logger implementation
 */
class ConsoleLogger implements Logger {
  private shouldLog(level: string): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(config.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex <= currentLevelIndex;
  }

  info(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.log(`[INFO] ${message}`, meta ? meta : '');
    }
  }

  error(message: string, error?: Error): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error || '');
    }
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, meta ? meta : '');
    }
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, meta ? meta : '');
    }
  }
}

// Export a single logger instance
export const logger = new ConsoleLogger();
