import '../src/global/tailwind.css';
import type { Preview } from '@storybook/web-components-vite'
import { defineCustomElements } from '../dist/loader';

defineCustomElements();

const toKebab = (value: string): string =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const buildWebComponentSnippet = (tagName: string, args: Record<string, unknown>): string => {
  const attrs = Object.entries(args)
    .filter(([key, value]) => key !== 'children' && key !== 'onClick' && typeof value !== 'function' && value !== undefined && value !== null)
    .filter(([, value]) => !(typeof value === 'boolean' && value === false))
    .map(([key, value]) => {
      const attr = toKebab(key);
      if (typeof value === 'boolean') return attr;
      if (typeof value === 'object') return `${attr}='${JSON.stringify(value)}'`;
      return `${attr}="${escapeAttr(String(value))}"`;
    });

  return `<${tagName}${attrs.length ? ` ${attrs.join(' ')}` : ''}></${tagName}>`;
};

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (_src, context) => {
          const component = context.component;
          const tagName =
            typeof component === 'string'
              ? component
              : typeof context.component?.tagName === 'string'
                ? context.component.tagName.toLowerCase()
                : '';

          if (!tagName || !tagName.includes('-')) {
            return _src;
          }

          return buildWebComponentSnippet(tagName, (context.args ?? {}) as Record<string, unknown>);
        },
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;