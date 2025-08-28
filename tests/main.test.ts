import { greet } from '@/utils/greeter';
import { logger } from '@/utils/logger';
import { AppError, createValidationError } from '@/errors/AppError';
import { config } from '@/config';
import { constant } from '@public/constants.json';

describe('Template Tests', () => {
  test('greeter function works correctly', () => {
    expect(greet('World')).toBe('Hello, World! Welcome to TypeScript with ESNext modules!');
  });

  test('constants are accessible', () => {
    expect(constant).toBe('0x00ff');
  });

  test('config is properly loaded', () => {
    expect(config.nodeEnv).toBeDefined();
    expect(config.logLevel).toBeDefined();
  });

  test('custom error class works', () => {
    const error = createValidationError('Test error');
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
  });

  test('logger has required methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });
});
