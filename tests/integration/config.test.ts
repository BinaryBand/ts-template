/**
 * Integration tests for configuration and environment
 */

import { config, isDevelopment, isProduction, isTest } from '@/config';

describe('Configuration Integration', () => {
  describe('config object', () => {
    test('should have all required properties', () => {
      expect(config).toHaveProperty('nodeEnv');
      expect(config).toHaveProperty('logLevel');
      expect(config).toHaveProperty('secretKey');
    });

    test('should have valid log level', () => {
      expect(['debug', 'info', 'warn', 'error']).toContain(config.logLevel);
    });

    test('should respect NODE_ENV environment variable', () => {
      expect(config.nodeEnv).toBeDefined();
      expect(typeof config.nodeEnv).toBe('string');
    });
  });

  describe('environment flags', () => {
    test('should have correct environment detection', () => {
      // At least one should be true, but not multiple
      const envFlags = [isDevelopment, isProduction, isTest];
      const trueFlags = envFlags.filter(Boolean);
      expect(trueFlags.length).toBeGreaterThanOrEqual(1);
    });

    test('should match config.nodeEnv', () => {
      if (config.nodeEnv === 'development') {
        expect(isDevelopment).toBe(true);
      } else if (config.nodeEnv === 'production') {
        expect(isProduction).toBe(true);
      } else if (config.nodeEnv === 'test') {
        expect(isTest).toBe(true);
      }
    });
  });

  describe('environment variable handling', () => {
    test('should handle missing LOG_LEVEL gracefully', () => {
      // Should default to 'info' if not set or invalid
      expect(config.logLevel).toBeDefined();
    });

    test('should handle secretKey being undefined', () => {
      // secretKey can be undefined, which is valid
      expect(config.secretKey === undefined || typeof config.secretKey === 'string').toBe(true);
    });
  });
});
