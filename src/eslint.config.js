// eslint.config.js
import js from '@eslint/js';
import ts from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default ts.config(
  {
    // Base configuration for all files
    extends: [js.configs.recommended],
    ignores: ['dist/', 'node_modules/'],
  },
  {
    // TypeScript files configuration
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      ...ts.configs.recommended,
    ],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Remove unused imports automatically
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { 
          vars: 'all', 
          varsIgnorePattern: '^_', 
          args: 'after-used', 
          argsIgnorePattern: '^_' 
        }
      ],
    },
  },
);