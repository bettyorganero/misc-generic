import { newSpecPage } from '@stencil/core/testing';
import { SelectField } from '../select-field';

describe('select-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SelectField],
      html: `<select-field></select-field>`,
    });
    expect(page.root).toEqualHtml(`
      <select-field>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </select-field>
    `);
  });
});
