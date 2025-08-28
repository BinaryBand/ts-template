import 'dotenv/config';
import { greet } from '@/utils/greeter';
import { logger } from '@/utils/logger';
import { config, isDevelopment } from '@/config';
import { AppError } from '@/errors/AppError';
import { blake2b } from '@noble/hashes/blake2';

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

    // Example usage of crypto functionality
    const hash = Buffer.from(blake2b('Hello, World!', { dkLen: 32 })).toString('hex');
    logger.info('Hash generated', { hash });

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

// Run the application
main();
