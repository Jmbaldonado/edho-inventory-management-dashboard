import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ recommendedConfig: js.configs.recommended });

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'brace-style': 'off',
      'key-spacing': [
        'error',
        {
          beforeColon: true,
          align: 'colon',
        },
      ],
      indent: ['error', 4],
      'max-len': 'off',
      'no-multi-spaces': 'off',
      'no-multi-str': 'off',
      'no-var': 'off',
      'no-trailing-spaces': 'error',
      'one-var': 'off',
      'prefer-rest-params': 'off',
      'spaced-comment': 'off',
      'object-curly-spacing': ['error', 'always'],
      'switch-colon-spacing': ['error', { after: true, before: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', { objects: 'always-multiline' }],
      'comma-spacing': ['error', { before: false, after: true }],
    },
  },
];
