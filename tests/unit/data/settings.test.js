import { describe, it, expect } from 'vitest';
import settings from '../../../src/site/_data/settings.json' assert { type: 'json' };

describe('Settings Validation', () => {
  describe('Required Fields', () => {
    it('should have required fields', () => {
      const requiredFields = ['title', 'description', 'url', 'email'];

      requiredFields.forEach(field => {
        expect(settings).toHaveProperty(field);
        expect(typeof settings[field]).toBe('string');
        expect(settings[field].length).toBeGreaterThan(0);
      });
    });

    it('should have title field with content', () => {
      expect(settings.title).toBeTruthy();
      expect(settings.title.length).toBeGreaterThan(0);
    });

    it('should have description field with content', () => {
      expect(settings.description).toBeTruthy();
      expect(settings.description.length).toBeGreaterThan(0);
    });
  });

  describe('URL Validation', () => {
    it('should have valid URL formats', () => {
      const urlFields = ['url', 'justgivingUrl', 'facebookUrl'];

      urlFields.forEach(field => {
        if (settings[field]) {
          expect(settings[field]).toMatch(/^https?:\/\/.+/);
        }
      });
    });

    it('should have main url starting with https', () => {
      expect(settings.url).toMatch(/^https:\/\//);
    });
  });

  describe('Email Validation', () => {
    it('should have valid email format', () => {
      expect(settings.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should have email with proper domain', () => {
      const emailParts = settings.email.split('@');
      expect(emailParts).toHaveLength(2);
      expect(emailParts[1]).toContain('.');
    });
  });

  describe('Social Media Links', () => {
    it('should have JustGiving URL if present', () => {
      if (settings.justgivingUrl) {
        expect(settings.justgivingUrl).toMatch(/justgiving\.com/);
      }
    });

    it('should have Facebook URL if present', () => {
      if (settings.facebookUrl) {
        expect(settings.facebookUrl).toMatch(/facebook\.com/);
      }
    });
  });
});
