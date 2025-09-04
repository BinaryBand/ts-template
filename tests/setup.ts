/**
 * Test setup and utilities
 */

import { config } from '@/config';

/**
 * Global test setup - runs before all tests
 */
beforeAll(() => {
  // Set test environment
  process.env['NODE_ENV'] = 'test';
  process.env['LOG_LEVEL'] = 'error'; // Reduce noise in test output
});

/**
 * Setup before each test
 */
beforeEach(() => {
  // Clear any timers, mocks, or state that might affect tests
  jest.clearAllTimers();
});

/**
 * Cleanup after each test
 */
afterEach(() => {
  // Reset any mocks or spies
  jest.restoreAllMocks();
});

/**
 * Test utilities
 */
export const TestUtils = {
  /**
   * Create mock error metadata for testing
   */
  createMockErrorMeta: {
    validation: (field = 'testField', constraint = 'required') => ({
      field,
      constraint,
      value: 'test-value',
    }),

    notFound: (resourceType = 'user', resourceId = 123) => ({
      resourceType,
      resourceId,
      searchParams: { status: 'active' },
    }),

    authentication: (reason: 'expired' | 'invalid' | 'missing' = 'invalid') => ({
      authMethod: 'token' as const,
      userId: 'test-user-123',
      reason,
    }),
  },

  /**
   * Create test configuration override
   */
  createTestConfig: (overrides: Partial<typeof config> = {}) => ({
    ...config,
    nodeEnv: 'test',
    logLevel: 'error' as const,
    ...overrides,
  }),

  /**
   * Mock logger for testing (to avoid console output)
   */
  createMockLogger: () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }),

  /**
   * Wait for a specified time (useful for testing async operations)
   */
  wait: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Generate test data
   */
  generateTestData: {
    randomString: (length = 10) =>
      Math.random()
        .toString(36)
        .substring(2, length + 2),
    randomNumber: (min = 0, max = 1000) => Math.floor(Math.random() * (max - min + 1)) + min,
    randomEmail: () => `test${Math.random().toString(36).substring(2)}@example.com`,
  },
};

/**
 * Custom Jest matchers (optional - extend expect)
 */
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAppError(expectedCode?: string): R;
    }
  }
}

// Custom matcher for AppError instances
expect.extend({
  toBeAppError(received, expectedCode) {
    const isAppError = received instanceof Error && received.name === 'AppError';
    const pass = isAppError && (expectedCode ? (received as any).code === expectedCode : true);

    if (pass) {
      return {
        message: () => `expected ${received} not to be an AppError${expectedCode ? ` with code ${expectedCode}` : ''}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be an AppError${expectedCode ? ` with code ${expectedCode}` : ''}`,
        pass: false,
      };
    }
  },
});
