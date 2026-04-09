import { newSpecPage } from '@stencil/core/testing';
import { CheckboxField } from '../checkbox-field';

describe('checkbox-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CheckboxField],
      html: `<checkbox-field></checkbox-field>`,
    });
    expect(page.root).toEqualHtml(`
      <checkbox-field>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </checkbox-field>
    `);
  });
});
