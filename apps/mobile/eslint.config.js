import { config as reactConfig } from '@repo/eslint-config/react-internal'

/**
 * ESLint configuration for the mobile app.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...reactConfig,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      '.expo-shared/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
  {
    rules: {
      // Add any mobile-specific rules here
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]
