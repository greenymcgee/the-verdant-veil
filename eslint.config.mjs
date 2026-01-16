import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import vitest from '@vitest/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default [
  // Ignore patterns
  {
    ignores: [
      '.next/**',
      '.storybook/**',
      'build/**',
      'coverage/**',
      'dist/**',
      'generated-types/**',
      'node_modules/**',
      'storybook-static/**',
    ],
  },
  
  // Base ESLint recommended rules
  js.configs.recommended,
  
  // TypeScript ESLint recommended rules
  ...typescriptEslint.configs.recommended,
  
  // Storybook recommended rules
  ...storybook.configs['flat/recommended'],
  
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
    },
    plugins: {
      '@next/next': nextPlugin,
      '@vitest': vitest,
      'import': importPlugin,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-sort-props': 'error',
      'react/no-multi-comp': 'error',
      'react/no-unused-prop-types': 2,
      'react/self-closing-comp': 'error',
      
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // JSX A11y rules
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
        },
      ],
      
      // Next.js rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      
      // Vitest rules
      '@vitest/max-expects': [
        'error',
        {
          max: 2,
        },
      ],
      
      // General rules
      camelcase: 'error',
      
      // Import rules
      'import/no-cycle': 'error',
      'import/no-named-as-default': 0,
      'no-console': 'error',
      'object-shorthand': 'error',
      'require-await': 'error',
      
      // Import sort rules
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^react$', '^@?\\w'], ['^'], ['^\\.']],
        },
      ],
      'sort-keys': 'error',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
      react: {
        version: 'detect',
      },
    },
  },
]
