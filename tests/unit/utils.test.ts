/**
 * Unit tests for utility functions
 */

import { greet } from '@/utils/greeter';
import { logger } from '@/utils/logger';
import { EXAMPLE_HEX, APP_NAME, VERSION } from '@/constants';
import { TestUtils } from '../setup';

describe('Utils', () => {
  describe('greeter', () => {
    test('should return correct greeting message', () => {
      const result = greet('World');
      expect(result).toBe('Hello, World! Welcome to TypeScript with ESNext modules!');
    });

    test('should handle different names', () => {
      expect(greet('Alice')).toContain('Alice');
      expect(greet('Bob')).toContain('Bob');
    });

    test('should handle empty string', () => {
      const result = greet('');
      expect(result).toContain('Hello, !');
    });
  });

  describe('logger', () => {
    test('should have all required methods', () => {
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.debug).toBe('function');
    });

    test('should be callable without throwing', () => {
      expect(() => {
        logger.info('test message');
        logger.warn('test warning', { meta: 'data' });
        logger.error('test error', new Error('test'));
        logger.debug('test debug', { debug: true });
      }).not.toThrow();
    });
  });

  describe('constants', () => {
    test('should have expected constant values', () => {
      expect(EXAMPLE_HEX).toBe('0x00ff');
      expect(APP_NAME).toBe('TypeScript Template');
      expect(VERSION).toBe('1.0.0');
    });

    test('should be properly typed constants', () => {
      // Constants are properly typed and accessible
      expect(typeof EXAMPLE_HEX).toBe('string');
      expect(typeof APP_NAME).toBe('string');
      expect(typeof VERSION).toBe('string');

      // Test that they're readonly at type level (compile-time check)
      // Runtime immutability would require Object.freeze() which we're not doing here
    });
  });

  describe('TestUtils', () => {
    test('should generate random test data', () => {
      const str1 = TestUtils.generateTestData.randomString();
      const str2 = TestUtils.generateTestData.randomString();
      expect(str1).not.toBe(str2);
      expect(str1).toMatch(/^[a-z0-9]+$/);
    });

    test('should generate random numbers in range', () => {
      const num = TestUtils.generateTestData.randomNumber(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    });

    test('should generate valid email addresses', () => {
      const email = TestUtils.generateTestData.randomEmail();
      expect(email).toMatch(/^test[a-z0-9]+@example\.com$/);
    });
  });
});
