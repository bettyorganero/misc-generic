import { newE2EPage } from '@stencil/core/testing';

describe('textarea-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<textarea-field></textarea-field>');

    const element = await page.find('textarea-field');
    expect(element).toHaveClass('hydrated');
  });
});
