import 'dotenv/config';
import { greet } from '@/utils/greeter';
import { logger } from '@/utils/logger';
import { config, isDevelopment } from '@/config';
import { AppError } from '@/errors/AppError';

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    logger.info('Application starting...');
    logger.debug('Running in development mode', { isDevelopment });

    // Example usage of the greeter utility
    const message = greet('World');
    logger.info('Greeting generated', { message });

    // Example usage of configuration
    logger.info('Environment info', {
      nodeEnv: config.nodeEnv,
      hasSecret: !!config.secretKey,
      logLevel: config.logLevel,
    });

    // Example usage of built-in Node.js functionality
    const timestamp = new Date().toISOString();
    const randomId = Math.random().toString(36).substring(2, 15);
    logger.info('Generated data', { timestamp, randomId });

    logger.info('Application started successfully');
  } catch (error) {
    if (error instanceof AppError) {
      logger.error(`Application error: ${error.message}`, error);
    } else {
      logger.error('Unexpected error occurred', error as Error);
    }
    process.exit(1);
  }
}

// Export utilities for external use
export { logger } from '@/utils/logger';
export { greet } from '@/utils/greeter';
export { config, isDevelopment, isProduction, isTest } from '@/config';
export { AppError, ErrorCodes, isAppError, toAppError } from '@/errors/AppError';
export { APP_CONSTANTS, EXAMPLE_HEX, APP_NAME, VERSION, DEFAULT_TIMEOUT } from '@/constants';

// Run the application
main();
