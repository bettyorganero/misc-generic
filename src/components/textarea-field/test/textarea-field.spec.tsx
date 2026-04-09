import { newSpecPage } from '@stencil/core/testing';
import { TextareaField } from '../textarea-field';

describe('textarea-field', () => {
  it('renders label and control slot', async () => {
    const page = await newSpecPage({
      components: [TextareaField],
      html: `<textarea-field label="Message"></textarea-field>`,
    });

    const label = page.root?.shadowRoot?.querySelector('.field__label');
    const controlSlot = page.root?.shadowRoot?.querySelector('slot[name="control"]');
    expect(label?.textContent?.trim()).toBe('Message');
    expect(label?.getAttribute('for')).toContain('textarea-field-');
    expect(controlSlot).not.toBeNull();
  });

  it('renders error with aria-live polite', async () => {
    const page = await newSpecPage({
      components: [TextareaField],
      html: `<textarea-field invalid error-message="Required"></textarea-field>`,
    });

    const error = page.root?.shadowRoot?.querySelector('.field__error');
    expect(error?.getAttribute('aria-live')).toBe('polite');
    expect(error?.textContent?.trim()).toBe('Required');
  });
});
