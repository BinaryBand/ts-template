/**
 * Simple application configuration
 */

export interface AppConfig {
  nodeEnv: string;
  secretKey: string | undefined;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

function getLogLevel(): AppConfig['logLevel'] {
  const level = process.env['LOG_LEVEL']?.toLowerCase();
  if (level && ['debug', 'info', 'warn', 'error'].includes(level)) {
    return level as AppConfig['logLevel'];
  }
  return 'info';
}

export const config: AppConfig = {
  nodeEnv: process.env['NODE_ENV'] || 'development',
  secretKey: process.env['SUPER_SECRETIVE_SECRET'],
  logLevel: getLogLevel(),
};

// Simple environment checks
export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';
export const isTest = config.nodeEnv === 'test';
