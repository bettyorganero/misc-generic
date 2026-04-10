import { newSpecPage } from '@stencil/core/testing';
import { SliderField } from '../slider-field';

describe('slider-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SliderField],
      html: `<slider-field></slider-field>`,
    });
    expect(page.root).toEqualHtml(`
      <slider-field>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </slider-field>
    `);
  });
});
