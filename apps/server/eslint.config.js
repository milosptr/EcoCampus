import { config as baseConfig } from '@repo/eslint-config/base'

/**
 * ESLint configuration for the server app.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...baseConfig,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.config.js'],
  },
  {
    rules: {
      // Add any server-specific rules here
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
