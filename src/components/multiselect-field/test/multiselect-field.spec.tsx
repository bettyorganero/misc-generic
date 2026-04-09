import { newSpecPage } from '@stencil/core/testing';
import { MultiselectField } from '../multiselect-field';

describe('multiselect-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MultiselectField],
      html: `<multiselect-field></multiselect-field>`,
    });
    expect(page.root).toEqualHtml(`
      <multiselect-field>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </multiselect-field>
    `);
  });
});
