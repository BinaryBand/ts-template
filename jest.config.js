import { createDefaultPreset, pathsToModuleNameMapper } from 'ts-jest';

const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: { ...createDefaultPreset().transform },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@/*': ['src/*'],
  }),
};

export default jestConfig;
