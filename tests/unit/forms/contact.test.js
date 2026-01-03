import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Contact Form Validation', () => {
  let document;

  beforeAll(() => {
    // Read the contact.njk template
    const templatePath = path.resolve(__dirname, '../../../src/site/contact.njk');
    const html = fs.readFileSync(templatePath, 'utf-8');

    // Parse with happy-dom
    const window = new Window();
    document = window.document;
    document.write(html);
  });

  describe('Form Structure', () => {
    it('should have Netlify form attributes', () => {
      const form = document.querySelector('form[name="contact"]');

      expect(form).toBeTruthy();
      expect(form.getAttribute('data-netlify')).toBe('true');
      expect(form.getAttribute('netlify-honeypot')).toBe('bot-field');
      expect(form.getAttribute('method')).toBe('POST');
      expect(form.getAttribute('action')).toBe('/contact-success/');
    });

    it('should have honeypot field for spam protection', () => {
      const honeypot = document.querySelector('input[name="bot-field"]');

      expect(honeypot).toBeTruthy();
      expect(honeypot.getAttribute('tabindex')).toBe('-1');
      expect(honeypot.getAttribute('autocomplete')).toBe('off');
    });

    it('should have honeypot wrapper with hidden class', () => {
      const honeypot = document.querySelector('input[name="bot-field"]');
      const wrapper = honeypot?.closest('p');

      expect(wrapper).toBeTruthy();
      expect(wrapper.classList.contains('hidden')).toBe(true);
    });

    it('should have all required fields', () => {
      const requiredFields = ['name', 'email', 'message'];

      requiredFields.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        expect(field, `Field "${fieldName}" should exist`).toBeTruthy();
        expect(field.hasAttribute('required'), `Field "${fieldName}" should be required`).toBe(true);
      });
    });
  });

  describe('Field Validation', () => {
    it('should have email input with type="email"', () => {
      const emailField = document.querySelector('input[name="email"]');

      expect(emailField.getAttribute('type')).toBe('email');
      expect(emailField.getAttribute('autocomplete')).toBe('email');
    });

    it('should have name input with proper attributes', () => {
      const nameField = document.querySelector('input[name="name"]');

      expect(nameField.getAttribute('type')).toBe('text');
      expect(nameField.getAttribute('autocomplete')).toBe('name');
    });

    it('should have textarea for message with minimum rows', () => {
      const messageField = document.querySelector('textarea[name="message"]');

      expect(messageField).toBeTruthy();
      expect(parseInt(messageField.getAttribute('rows'))).toBeGreaterThanOrEqual(5);
    });

    it('should have submit button', () => {
      const submitBtn = document.querySelector('button[type="submit"]');

      expect(submitBtn).toBeTruthy();
      expect(submitBtn.textContent.trim()).toContain('Send message');
    });
  });

  describe('Accessibility', () => {
    it('should have labels for all input fields', () => {
      const inputs = ['name', 'email', 'message'];

      inputs.forEach(inputName => {
        const input = document.querySelector(`[name="${inputName}"]`);
        const label = document.querySelector(`label[for="${inputName}"]`);

        expect(label, `Label for "${inputName}" should exist`).toBeTruthy();
        expect(input.getAttribute('id'), `Input "${inputName}" should have id`).toBe(inputName);
      });
    });

    it('should have aria-hidden on honeypot wrapper', () => {
      const wrapper = document.querySelector('input[name="bot-field"]')?.closest('p');

      expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have proper label text content', () => {
      const nameLabel = document.querySelector('label[for="name"]');
      const emailLabel = document.querySelector('label[for="email"]');
      const messageLabel = document.querySelector('label[for="message"]');

      expect(nameLabel.textContent.trim()).toContain('name');
      expect(emailLabel.textContent.trim()).toContain('Email');
      expect(messageLabel.textContent.trim()).toContain('Message');
    });
  });

  describe('Form Styling', () => {
    it('should have proper form spacing classes', () => {
      const form = document.querySelector('form[name="contact"]');

      expect(form.classList.contains('space-y-6')).toBe(true);
    });

    it('should have input fields with proper styling classes', () => {
      const nameField = document.querySelector('input[name="name"]');

      expect(nameField.classList.contains('block')).toBe(true);
      expect(nameField.classList.contains('w-full')).toBe(true);
      expect(nameField.classList.contains('rounded-md')).toBe(true);
    });

    it('should have dark mode support classes on inputs', () => {
      const nameField = document.querySelector('input[name="name"]');
      const classString = nameField.className;

      expect(classString).toContain('dark:');
    });
  });
});
