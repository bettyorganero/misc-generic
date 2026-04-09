import { newE2EPage } from '@stencil/core/testing';

describe('input-field', () => {
  it('shows error with polite live region', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <input-field
        input-id="email"
        label="Email"
        help-text="Help text"
        error-message="Email is required"
        invalid
        has-suffix
      >
        <input slot="control" />
        <i slot="suffix" class="fa-solid fa-circle-xmark"></i>
      </input-field>
    `);

    const error = await page.find('input-field >>> .field__error');
    expect(error).not.toBeNull();
    expect(error).toEqualAttribute('aria-live', 'polite');
    expect(error).toEqualText('Email is required');
  });

  it('applies valid state class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <input-field input-id="email" valid>
        <input slot="control" />
      </input-field>
    `);

    const field = await page.find('input-field >>> .field');
    expect(field).toHaveClass('field--valid');
    expect(field).not.toHaveClass('field--invalid');
  });

  it('toggles prefix and suffix containers', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <input-field input-id="email">
        <input slot="control" />
      </input-field>
    `);

    expect(await page.find('input-field >>> .field__prefix')).toBeNull();
    expect(await page.find('input-field >>> .field__suffix')).toBeNull();

    await page.setContent(`
      <input-field input-id="email" has-prefix has-suffix>
        <i slot="prefix" class="fa-solid fa-envelope"></i>
        <input slot="control" />
        <i slot="suffix" class="fa-solid fa-circle-info"></i>
      </input-field>
    `);

    expect(await page.find('input-field >>> .field__prefix')).not.toBeNull();
    expect(await page.find('input-field >>> .field__suffix')).not.toBeNull();
  });
});
