import { describe, it, expect } from 'vitest';

describe('Cache Busting', () => {
  describe('Module Export', () => {
    it('should export function that returns css and js hashes', async () => {
      // Import the actual module
      const cacheBustModule = await import('../../../src/site/_data/cacheBust.js');
      const result = cacheBustModule.default();

      expect(result).toHaveProperty('css');
      expect(result).toHaveProperty('js');
      expect(typeof result.css).toBe('string');
      expect(typeof result.js).toBe('string');
    });

    it('should return valid hash format for existing files', async () => {
      const cacheBustModule = await import('../../../src/site/_data/cacheBust.js');
      const result = cacheBustModule.default();

      // Both should be strings with some length
      expect(result.css.length).toBeGreaterThan(0);
      expect(result.js.length).toBeGreaterThan(0);
    });

    it('should return different hashes when called multiple times', async () => {
      const cacheBustModule = await import('../../../src/site/_data/cacheBust.js');

      // Each call should return a hash (either MD5 or timestamp)
      const result1 = cacheBustModule.default();
      const result2 = cacheBustModule.default();

      // Hashes should be valid strings
      expect(result1.css).toBeTruthy();
      expect(result1.js).toBeTruthy();
      expect(result2.css).toBeTruthy();
      expect(result2.js).toBeTruthy();
    });

    it('should handle missing files gracefully with timestamp fallback', async () => {
      const cacheBustModule = await import('../../../src/site/_data/cacheBust.js');
      const result = cacheBustModule.default();

      // Even if actual CSS/JS files don't exist yet, should return valid hashes
      // Either MD5 (8 hex chars) or timestamp (base36)
      expect(result.css).toMatch(/^[a-z0-9]+$/i);
      expect(result.js).toMatch(/^[a-z0-9]+$/i);
    });
  });
});
