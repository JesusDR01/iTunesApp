import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	modulePaths: ['<rootDir>/src', '<rootDir>/tests'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	testEnvironment: 'jest-environment-jsdom',

	clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json-summary'],
  moduleDirectories: ['node_modules', 'src'],
  // moduleNameMapper: {
  //   '\\.(css|less|scss|html|svg)$': 'identity-obj-proxy',
  // },
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/src', '<rootDir>/node_modules'],
  // testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(uuid))', 'node_modules/@telefonica/estadio-infinito-common'],
};

module.exports = createJestConfig(customJestConfig);

