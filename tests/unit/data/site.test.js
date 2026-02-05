import { describe, it, expect } from 'vitest';
import siteData from '../../../src/site/_data/site.js';

describe('Site Data', () => {
  it('should export buildTime as Date object', () => {
    expect(siteData.buildTime).toBeInstanceOf(Date);
  });

  it('should export year as current year', () => {
    const currentYear = new Date().getFullYear();
    expect(siteData.year).toBe(currentYear);
  });

  it('should have buildTime matching year', () => {
    expect(siteData.buildTime.getFullYear()).toBe(siteData.year);
  });

  it('should have buildTime not in the future', () => {
    const now = new Date();
    expect(siteData.buildTime.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it('should have buildTime as recent timestamp', () => {
    const now = new Date();
    const timeDiff = now.getTime() - siteData.buildTime.getTime();

    // Build time should be within last hour (generous window for CI)
    expect(timeDiff).toBeLessThan(60 * 60 * 1000);
  });
});
