import { newE2EPage } from '@stencil/core/testing';

describe('radio-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radio-field></radio-field>');

    const element = await page.find('radio-field');
    expect(element).toHaveClass('hydrated');
  });
});
