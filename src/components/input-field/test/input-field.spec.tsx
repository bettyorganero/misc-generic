import { newSpecPage } from '@stencil/core/testing';
import { InputField } from '../input-field';

describe('input-field', () => {
  it('renders default structure', async () => {
    const page = await newSpecPage({
      components: [InputField],
      html: `<input-field label="Email"></input-field>`,
    });

    const label = page.root?.shadowRoot?.querySelector('.field__label');
    const controlSlot = page.root?.shadowRoot?.querySelector('slot[name="control"]');
    expect(label?.textContent?.trim()).toBe('Email');
    expect(label?.getAttribute('for')).toContain('input-field-');
    expect(controlSlot).not.toBeNull();
  });

  it('renders error message with polite live region', async () => {
    const page = await newSpecPage({
      components: [InputField],
      html: `<input-field invalid error-message="Email is required"></input-field>`,
    });

    const error = page.root?.shadowRoot?.querySelector('.field__error');
    expect(error).not.toBeNull();
    expect(error?.getAttribute('aria-live')).toBe('polite');
    expect(error?.textContent?.trim()).toBe('Email is required');
  });

  it('toggles prefix/suffix containers from props', async () => {
    const page = await newSpecPage({
      components: [InputField],
      html: `<input-field></input-field>`,
    });

    expect(page.root?.shadowRoot?.querySelector('.field__prefix')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('.field__suffix')).not.toBeNull();

    page.root?.setAttribute('has-prefix', '');
    page.root?.setAttribute('has-suffix', '');
    await page.waitForChanges();

    expect(page.root?.shadowRoot?.querySelector('.field__prefix')).not.toBeNull();
    expect(page.root?.shadowRoot?.querySelector('.field__suffix')).not.toBeNull();
  });
});
