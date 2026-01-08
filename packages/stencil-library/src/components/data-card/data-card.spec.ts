import { newSpecPage } from '@stencil/core/testing';
import { DataCard } from './data-card';

describe('data-card', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [DataCard],
      html: '<data-card></data-card>',
    });
    expect(root).toEqualHtml(`
      <data-card>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </data-card>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [DataCard],
      html: `<data-card first="Stencil" last="'Don't call me a framework' JS"></data-card>`,
    });
    expect(root).toEqualHtml(`
      <data-card first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </data-card>
    `);
  });
});
