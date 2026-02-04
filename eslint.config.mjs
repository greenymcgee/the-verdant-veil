import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import storybook from 'eslint-plugin-storybook'
import greenymcgeeConfig from '@greenymcgee/next-eslint-config'

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs['flat/recommended'],
  ...greenymcgeeConfig,
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
      'eslint.config.mjs',
    ],
  },
]
