import { beforeEach, afterEach } from 'vitest';

// Store original environment variables
let originalEnv;

beforeEach(() => {
  // Save original environment
  originalEnv = { ...process.env };
});

afterEach(() => {
  // Restore original environment
  process.env = { ...originalEnv };
});
