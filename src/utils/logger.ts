import { createConsola } from 'consola';
import { config } from '@/config';

/**
 * Logger interface for type consistency
 */
export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: Error): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

/**
 * Consola-based logger with configurable log level
 */
class ConsolaLogger implements Logger {
  private consola = createConsola({
    level: this.getLogLevel(),
    formatOptions: {
      colors: true,
      compact: false,
    },
  });

  private getLogLevel(): number {
    const levelMap = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
    return levelMap[config.logLevel] ?? 2;
  }

  info(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.consola.info(message, meta);
    } else {
      this.consola.info(message);
    }
  }

  error(message: string, error?: Error): void {
    if (error) {
      this.consola.error(message, error);
    } else {
      this.consola.error(message);
    }
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.consola.warn(message, meta);
    } else {
      this.consola.warn(message);
    }
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.consola.debug(message, meta);
    } else {
      this.consola.debug(message);
    }
  }
}

// Export a single logger instance
export const logger = new ConsolaLogger();
