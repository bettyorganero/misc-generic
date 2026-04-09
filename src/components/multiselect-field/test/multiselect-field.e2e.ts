import { newE2EPage } from '@stencil/core/testing';

describe('multiselect-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<multiselect-field></multiselect-field>');

    const element = await page.find('multiselect-field');
    expect(element).toHaveClass('hydrated');
  });
});
