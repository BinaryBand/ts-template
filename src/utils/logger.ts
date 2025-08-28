import { config } from '@/config';

/**
 * Simple logging utility
 */
export interface Logger {
  info(message: string, data?: any): void;
  error(message: string, error?: Error): void;
  warn(message: string, data?: any): void;
  debug(message: string, data?: any): void;
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

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.log(`[INFO] ${message}`, data ? data : '');
    }
  }

  error(message: string, error?: Error): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error || '');
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, data ? data : '');
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, data ? data : '');
    }
  }
}

// Export a single logger instance
export const logger = new ConsoleLogger();
