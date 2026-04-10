import { newE2EPage } from '@stencil/core/testing';

describe('slider-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<slider-field></slider-field>');

    const element = await page.find('slider-field');
    expect(element).toHaveClass('hydrated');
  });
});
