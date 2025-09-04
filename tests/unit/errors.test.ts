/**
 * Unit tests for error handling
 */

import { AppError, ErrorCodes, isAppError, toAppError } from '@/errors/AppError';
import { TestUtils } from '../setup';

describe('Error Handling', () => {
  describe('AppError', () => {
    test('should create validation error with metadata', () => {
      const meta = TestUtils.createMockErrorMeta.validation('email', 'required');
      const error = AppError.validation('Invalid email', meta);

      expect(error).toBeAppError('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.metadata?.field).toBe('email');
      expect(error.metadata?.constraint).toBe('required');
    });

    test('should create not found error with metadata', () => {
      const meta = TestUtils.createMockErrorMeta.notFound('user', 123);
      const error = AppError.notFound('User not found', meta);

      expect(error.isType('NOT_FOUND')).toBe(true);
      expect(error.statusCode).toBe(404);
      expect(error.metadata?.resourceId).toBe(123);
    });

    test('should create authentication error', () => {
      const meta = TestUtils.createMockErrorMeta.authentication('expired');
      const error = AppError.authentication('Token expired', meta);

      expect(error).toBeAppError('AUTHENTICATION_ERROR');
      expect(error.statusCode).toBe(401);
      expect(error.metadata?.reason).toBe('expired');
    });

    test('should create custom error with specific status code', () => {
      const error = AppError.custom('Custom error', 'CUSTOM_CODE', 418);

      expect(error.code).toBe('CUSTOM_CODE');
      expect(error.statusCode).toBe(418);
    });

    test('should convert to object correctly', () => {
      const error = AppError.internal('Internal server error');
      const obj = error.toObject();

      expect(obj).toEqual({
        name: 'AppError',
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        metadata: undefined,
        stack: expect.any(String),
      });
    });

    test('should maintain proper stack trace', () => {
      const error = AppError.validation('Test error');

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('AppError');
    });
  });

  describe('ErrorCodes', () => {
    test('should have all expected error codes', () => {
      expect(ErrorCodes.VALIDATION_ERROR).toEqual({
        code: 'VALIDATION_ERROR',
        status: 400,
      });
      expect(ErrorCodes.NOT_FOUND).toEqual({
        code: 'NOT_FOUND',
        status: 404,
      });
      expect(ErrorCodes.INTERNAL_SERVER_ERROR).toEqual({
        code: 'INTERNAL_SERVER_ERROR',
        status: 500,
      });
    });

    test('should be imported from external JSON', () => {
      // This tests that our abstraction worked
      expect(typeof ErrorCodes).toBe('object');
      expect(Object.keys(ErrorCodes).length).toBeGreaterThan(0);
    });
  });

  describe('Utility Functions', () => {
    test('isAppError should correctly identify AppError instances', () => {
      const appError = AppError.validation('Test');
      const regularError = new Error('Regular error');

      expect(isAppError(appError)).toBe(true);
      expect(isAppError(regularError)).toBe(false);
    });

    test('toAppError should convert different error types', () => {
      // String to AppError
      const fromString = toAppError('String error');
      expect(fromString).toBeAppError('UNKNOWN');
      expect(fromString.message).toBe('String error');

      // Regular Error to AppError
      const regularError = new Error('Regular error');
      const fromError = toAppError(regularError);
      expect(fromError).toBeAppError('UNKNOWN');
      expect(fromError.message).toBe('Regular error');

      // AppError should remain unchanged
      const appError = AppError.validation('Validation error');
      const fromAppError = toAppError(appError);
      expect(fromAppError).toBe(appError);
    });
  });

  describe('Error Types and Metadata', () => {
    test('should handle different error metadata types', () => {
      const validationError = AppError.validation('Validation failed', {
        field: 'username',
        constraint: 'minLength',
        value: 'ab',
      });

      const conflictError = AppError.conflict('Resource exists', {
        resourceType: 'user',
        conflictingField: 'email',
        existingValue: 'test@example.com',
      });

      expect(validationError.metadata?.field).toBe('username');
      expect(conflictError.metadata?.resourceType).toBe('user');
    });

    test('should handle errors without metadata', () => {
      const error = AppError.internal('Something went wrong');

      expect(error.metadata).toBeUndefined();
      expect(error).toBeAppError('INTERNAL_SERVER_ERROR');
    });
  });
});
