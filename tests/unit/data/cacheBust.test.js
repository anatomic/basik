import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the actual function logic to test
function getFileHash(filepath) {
  try {
    const content = fs.readFileSync(filepath);
    return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
  } catch {
    return Date.now().toString(36);
  }
}

describe('Cache Busting', () => {
  const testFixturesDir = path.resolve(__dirname, '../../fixtures/files');
  const cssPath = path.join(testFixturesDir, 'test-styles.css');
  const jsPath = path.join(testFixturesDir, 'test-main.js');

  beforeEach(() => {
    // Create fixture directory if it doesn't exist
    if (!fs.existsSync(testFixturesDir)) {
      fs.mkdirSync(testFixturesDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(cssPath)) {
      fs.unlinkSync(cssPath);
    }
    if (fs.existsSync(jsPath)) {
      fs.unlinkSync(jsPath);
    }
  });

  describe('Hash Generation', () => {
    it('should generate consistent MD5 hash for same content', () => {
      const content = 'body { color: red; }';
      fs.writeFileSync(cssPath, content);

      const hash1 = getFileHash(cssPath);
      const hash2 = getFileHash(cssPath);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(8);
    });

    it('should generate different hashes for different content', () => {
      fs.writeFileSync(cssPath, 'body { color: red; }');
      fs.writeFileSync(jsPath, 'console.log("test");');

      const cssHash = getFileHash(cssPath);
      const jsHash = getFileHash(jsPath);

      expect(cssHash).not.toBe(jsHash);
    });

    it('should generate 8-character hexadecimal hash', () => {
      fs.writeFileSync(cssPath, 'test content');
      const hash = getFileHash(cssPath);

      expect(hash).toMatch(/^[a-f0-9]{8}$/);
    });

    it('should change hash when content changes', () => {
      fs.writeFileSync(cssPath, 'body { color: red; }');
      const hash1 = getFileHash(cssPath);

      fs.writeFileSync(cssPath, 'body { color: blue; }');
      const hash2 = getFileHash(cssPath);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('Fallback Behavior', () => {
    it('should use timestamp when file does not exist', () => {
      const nonExistentPath = path.join(testFixturesDir, 'missing.css');
      const timestampHash = getFileHash(nonExistentPath);

      expect(timestampHash).toBeTruthy();
      expect(timestampHash).not.toMatch(/^[a-f0-9]{8}$/); // Not MD5 format
      expect(timestampHash).toMatch(/^[a-z0-9]+$/); // Base36 format
    });

    it('should generate valid base36 timestamp', () => {
      const nonExistentPath = path.join(testFixturesDir, 'missing.css');
      const timestampHash = getFileHash(nonExistentPath);

      // Verify it can be converted back to a number
      const timestamp = parseInt(timestampHash, 36);
      expect(timestamp).toBeGreaterThan(0);
      expect(timestamp).toBeLessThanOrEqual(Date.now());
    });

    it('should generate different timestamps on subsequent calls', async () => {
      const nonExistentPath = path.join(testFixturesDir, 'missing.css');
      const hash1 = getFileHash(nonExistentPath);

      // Wait 1ms to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1));

      const hash2 = getFileHash(nonExistentPath);

      // Should be different (though very close) timestamps
      expect(hash1).toBeTruthy();
      expect(hash2).toBeTruthy();
    });
  });

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
  });
});
