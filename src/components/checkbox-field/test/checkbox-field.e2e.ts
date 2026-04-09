import { newE2EPage } from '@stencil/core/testing';

describe('checkbox-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<checkbox-field></checkbox-field>');

    const element = await page.find('checkbox-field');
    expect(element).toHaveClass('hydrated');
  });
});
