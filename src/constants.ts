/**
 * Application constants
 */

export const APP_CONSTANTS = {
  // Example hex constant (moved from public/constants.json)
  EXAMPLE_HEX: '0x00ff',

  // Add more constants as needed for your application
  APP_NAME: 'TypeScript Template',
  VERSION: '1.0.0',
  DEFAULT_TIMEOUT: 5000,
} as const;

// Export individual constants for convenience
export const { EXAMPLE_HEX, APP_NAME, VERSION, DEFAULT_TIMEOUT } = APP_CONSTANTS;
