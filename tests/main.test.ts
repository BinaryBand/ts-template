import { greet } from '@/utils/greeter';
import { logger } from '@/utils/logger';
import { AppError } from '@/errors/AppError';
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

  test('validation error works', () => {
    const error = AppError.validation('Test error', { field: 'email', constraint: 'required' });
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
    expect(error.metadata?.field).toBe('email');
  });

  test('not found error with metadata works', () => {
    const error = AppError.notFound('User not found', { resourceType: 'user', resourceId: 123 });
    expect(error.isType('NOT_FOUND')).toBe(true);
    expect(error.metadata?.resourceId).toBe(123);
  });

  test('custom error with specific status code works', () => {
    const error = AppError.custom('Custom error', 'CUSTOM_CODE', 418);
    expect(error.code).toBe('CUSTOM_CODE');
    expect(error.statusCode).toBe(418);
  });

  test('logger has required methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });
});
