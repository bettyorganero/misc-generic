import { newSpecPage } from '@stencil/core/testing';
import { RadioField } from '../radio-field';

describe('radio-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadioField],
      html: `<radio-field label="Option A"></radio-field>`,
    });
    expect(page.root).toEqualHtml(`
      <radio-field label="Option A">
        <mock:shadow-root>
          <div class="field  ">
            <label class="field__control" htmlfor="radio-field-1">
              <input class="field__radio" id="radio-field-1" type="radio">
              <span aria-hidden="true" class="field__circle">
                <span class="field__dot"></span>
              </span>
              <span class="field__label">
                Option A
              </span>
            </label>
          </div>
        </mock:shadow-root>
      </radio-field>
    `);
  });
});
