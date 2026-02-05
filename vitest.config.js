import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    exclude: ['node_modules', '_site', '.git'],
    setupFiles: ['./tests/setup.js'],
    environment: 'node',
    environmentMatchGlobs: [
      ['tests/unit/forms/**', 'happy-dom']  // Use DOM for form tests
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['.eleventy.js', 'src/site/_data/**/*.js'],
      exclude: ['tests/**', 'node_modules/**', '_site/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    },
    reporters: ['verbose'],
    globals: true
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@tests': path.resolve(import.meta.dirname, './tests')
    }
  }
});
