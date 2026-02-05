import { describe, it, expect, beforeEach, vi } from 'vitest';
import eleventyConfig from '../../../.eleventy.js';

describe('Blog Collection Filtering', () => {
  let config;
  let collectionApi;

  beforeEach(() => {
    // Mock Eleventy config object
    config = {
      addCollection: vi.fn(),
      addFilter: vi.fn(),
      addGlobalData: vi.fn(),
      addPassthroughCopy: vi.fn(),
      setServerPassthroughCopyBehavior: vi.fn(),
      setTemplateFormats: vi.fn()
    };

    // Mock collection API with sample posts
    collectionApi = {
      getFilteredByGlob: vi.fn().mockReturnValue([
        {
          data: {
            title: 'Published Past Post',
            date: new Date('2024-01-01'),
            published: true
          },
          date: new Date('2024-01-01')
        },
        {
          data: {
            title: 'Unpublished Post',
            date: new Date('2024-02-01'),
            published: false
          },
          date: new Date('2024-02-01')
        },
        {
          data: {
            title: 'Scheduled Future Post',
            date: new Date('2026-06-01'),
            published: true
          },
          date: new Date('2026-06-01')
        }
      ])
    };
  });

  describe('Production Environment', () => {
    beforeEach(() => {
      process.env.CONTEXT = 'production';
      eleventyConfig(config);
    });

    it('should only include published posts with past dates', () => {
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      expect(result).toHaveLength(1);
      expect(result[0].data.title).toBe('Published Past Post');
    });

    it('should exclude posts with published: false', () => {
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      expect(result.some(post => post.data.published === false)).toBe(false);
    });

    it('should exclude posts with future dates', () => {
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);
      const now = new Date();

      expect(result.every(post => new Date(post.data.date) <= now)).toBe(true);
    });

    it('should sort posts by date (newest first)', () => {
      // Update mock to include multiple past published posts
      collectionApi.getFilteredByGlob.mockReturnValue([
        {
          data: { title: 'Older Post', date: new Date('2023-01-01'), published: true },
          date: new Date('2023-01-01')
        },
        {
          data: { title: 'Newer Post', date: new Date('2024-01-01'), published: true },
          date: new Date('2024-01-01')
        }
      ]);

      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      // Verify descending order (newest first)
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].date >= result[i + 1].date).toBe(true);
      }
    });
  });

  describe('Non-Production Environment', () => {
    beforeEach(() => {
      process.env.CONTEXT = 'preview';
      eleventyConfig(config);
    });

    it('should include all posts regardless of published status', () => {
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      expect(result).toHaveLength(3);
    });

    it('should include posts with future dates', () => {
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);
      const now = new Date();

      expect(result.some(post => new Date(post.data.date) > now)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      process.env.CONTEXT = 'production';
    });

    it('should handle posts with missing published field', () => {
      collectionApi.getFilteredByGlob.mockReturnValue([{
        data: { title: 'No Published Field', date: new Date('2024-01-01') },
        date: new Date('2024-01-01')
      }]);

      eleventyConfig(config);
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      expect(result).toHaveLength(0); // Should be filtered out (falsy)
    });

    it('should handle empty collection', () => {
      collectionApi.getFilteredByGlob.mockReturnValue([]);
      eleventyConfig(config);

      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      expect(result).toHaveLength(0);
    });

    it('should include posts with date exactly equal to now', () => {
      const now = new Date();

      collectionApi.getFilteredByGlob.mockReturnValue([{
        data: { title: 'Exact Time Post', date: now, published: true },
        date: now
      }]);

      eleventyConfig(config);
      const blogCollectionFn = config.addCollection.mock.calls
        .find(call => call[0] === 'blog')[1];

      const result = blogCollectionFn(collectionApi);

      expect(result).toHaveLength(1);
    });
  });
});
