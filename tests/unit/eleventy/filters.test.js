import { describe, it, expect, beforeEach, vi } from 'vitest';
import eleventyConfig from '../../../.eleventy.js';

describe('Date Formatting Filters', () => {
  let config;
  let filters;

  beforeEach(() => {
    config = {
      addFilter: vi.fn(),
      addCollection: vi.fn(),
      addGlobalData: vi.fn(),
      addPassthroughCopy: vi.fn(),
      setServerPassthroughCopyBehavior: vi.fn(),
      setTemplateFormats: vi.fn()
    };

    eleventyConfig(config);

    // Extract filters from mock calls
    filters = {};
    config.addFilter.mock.calls.forEach(([name, fn]) => {
      filters[name] = fn;
    });
  });

  describe('dateFormat', () => {
    it('should format Date object correctly (en-GB locale)', () => {
      const date = new Date('2024-03-15');
      const formatted = filters.dateFormat(date);

      expect(formatted).toBe('15 March 2024');
    });

    it('should format string date correctly', () => {
      const dateString = '2024-12-25';
      const formatted = filters.dateFormat(dateString);

      expect(formatted).toBe('25 December 2024');
    });

    it('should handle different date formats', () => {
      const testCases = [
        { input: '2024-01-01', expected: '1 January 2024' },
        { input: '2024-06-30', expected: '30 June 2024' },
        { input: new Date('2024-11-11'), expected: '11 November 2024' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(filters.dateFormat(input)).toBe(expected);
      });
    });

    it('should handle leap year dates', () => {
      const date = new Date('2024-02-29');
      const formatted = filters.dateFormat(date);

      expect(formatted).toBe('29 February 2024');
    });
  });

  describe('isoDate', () => {
    it('should format Date object as ISO 8601 (YYYY-MM-DD)', () => {
      const date = new Date('2024-03-15T10:30:00Z');
      const formatted = filters.isoDate(date);

      expect(formatted).toBe('2024-03-15');
    });

    it('should handle string dates', () => {
      const dateString = '2024-12-25T00:00:00Z';
      const formatted = filters.isoDate(dateString);

      expect(formatted).toMatch(/^2024-12-2[45]$/); // Account for timezone
    });

    it('should always return YYYY-MM-DD format', () => {
      const date = new Date('2024-01-05');
      const formatted = filters.isoDate(date);

      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should handle different months correctly', () => {
      const testCases = [
        { input: '2024-01-15', expectedPattern: /^2024-01-1[45]$/ },
        { input: '2024-06-20', expectedPattern: /^2024-06-2[01]$/ },
        { input: '2024-12-31', expectedPattern: /^2024-12-31$/ }
      ];

      testCases.forEach(({ input, expectedPattern }) => {
        const formatted = filters.isoDate(input);
        expect(formatted).toMatch(expectedPattern);
      });
    });
  });

  describe('isFutureDate', () => {
    it('should return true for future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      expect(filters.isFutureDate(futureDate)).toBe(true);
    });

    it('should return false for past dates', () => {
      const pastDate = new Date('2020-01-01');

      expect(filters.isFutureDate(pastDate)).toBe(false);
    });

    it('should return false for current date (edge case)', () => {
      const now = new Date();

      expect(filters.isFutureDate(now)).toBe(false);
    });

    it('should handle string dates', () => {
      const futureString = '2030-12-31';
      const pastString = '2020-01-01';

      expect(filters.isFutureDate(futureString)).toBe(true);
      expect(filters.isFutureDate(pastString)).toBe(false);
    });

    it('should work with various future date formats', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      expect(filters.isFutureDate(tomorrow)).toBe(true);
      expect(filters.isFutureDate(nextYear)).toBe(true);
    });

    it('should work with various past date formats', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);

      expect(filters.isFutureDate(yesterday)).toBe(false);
      expect(filters.isFutureDate(lastYear)).toBe(false);
    });
  });
});
