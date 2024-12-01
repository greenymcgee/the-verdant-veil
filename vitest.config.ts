import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        '.next/**',
        'next.config.ts',
        'next-env.d.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'vitest.config.ts',
      ],
      thresholds: {
        global: {
          branches: 97,
          functions: 99,
          lines: 99,
          statements: 99,
        },
      },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/*'),
    },
  },
})
