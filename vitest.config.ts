/* eslint-disable sort-keys */
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'generated-types/**',
        'scripts/generateTypes.ts',
        '.next/**',
        'next.config.ts',
        'next-env.d.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'vitest.config.ts',
        'src/stories/**',
        '.storybook/**',
        'types/**',
        'src/components/index.ts',
        'index.d.ts',
        'src/components/svgs/**',
        'src/test/**',
        'src/lib/logger.ts',
        'src/app/layout.tsx',
        'src/app/admin/layout.tsx',
        'src/app/admin/components/index.ts',
        'src/**/types.ts',
      ],
      thresholds: {
        branches: 97,
        functions: 99,
        lines: 99,
        statements: 99,
      },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx', 'jest-useragent-mock'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
})

/* eslint-enable sort-keys */
