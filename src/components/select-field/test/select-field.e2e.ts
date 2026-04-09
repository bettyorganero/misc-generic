import { newE2EPage } from '@stencil/core/testing';

describe('select-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<select-field></select-field>');

    const element = await page.find('select-field');
    expect(element).toHaveClass('hydrated');
  });
});
