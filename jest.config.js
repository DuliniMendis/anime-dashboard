// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
//   moduleDirectories: ['node_modules'],
//   testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
//   testTimeout: 60000,
// }

const nextJest = require('next/jest')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
module.exports = createJestConfig(customJestConfig)
