module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "\\.mock\\.ts",
    "<rootDir>/src/setupTests.ts",
    "<rootDir>/src/client.ts",
    "<rootDir>/src/index.ts",
    '<rootDir>/src/shared/models/*',
    '<rootDir>/src/routes/*'
  ],
};