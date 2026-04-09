import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type UiButtonArgs = {
  label: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'only-icon';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  loading: boolean;
  type: 'button' | 'submit' | 'reset';
  hasIcon: boolean;
  icon: string;
  iconPosition: 'left' | 'right';
  fullWidth: boolean;
};

const buildUiButtonSource = (args: UiButtonArgs): string => {
  const attrs: string[] = [
    `label="${args.label}"`,
    `variant="${args.variant}"`,
    `size="${args.size}"`,
    `type="${args.type}"`,
  ];

  if (args.disabled) attrs.push('disabled');
  if (args.loading) attrs.push('loading');
  if (args.fullWidth) attrs.push('full-width');
  if (args.variant === 'only-icon') attrs.push('icon-only');
  if (args.hasIcon) attrs.push(`icon="${args.icon}"`, `icon-position="${args.iconPosition}"`);

  const slotIcon = args.hasIcon
    ? args.variant === 'only-icon'
      ? `\n  <i slot="icon-only" class="${args.icon}"></i>\n`
      : args.iconPosition === 'left'
        ? `\n  <i slot="icon-left" class="${args.icon}"></i>\n`
        : `\n  <i slot="icon-right" class="${args.icon}"></i>\n`
    : '';

  return `<ui-button ${attrs.join(' ')}>${slotIcon}</ui-button>`;
};

const meta: Meta<UiButtonArgs> = {
  title: 'Misc Generic/Components/UI Button',
  component: 'ui-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (_src, context) => buildUiButtonSource(context.args as UiButtonArgs),
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'only-icon'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    hasIcon: { control: 'boolean' },
    icon: { control: 'text', if: { arg: 'hasIcon', eq: true } },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      if: { arg: 'hasIcon', eq: true },
    },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'small',
    disabled: false,
    loading: false,
    type: 'button',
    hasIcon: false,
    iconPosition: 'left',
    icon: 'fa-solid fa-house',
    fullWidth: false,
  },
  render: (args) => html`
    <ui-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
      .loading=${args.loading}
      .type=${args.type}
      .iconOnly=${args.variant === 'only-icon'}
      .icon=${args.hasIcon ? args.icon : ''}
      .iconPosition=${args.iconPosition}
      .fullWidth=${args.fullWidth}
    >
      ${args.hasIcon
        ? args.variant === 'only-icon'
          ? html`<i slot="icon-only" class=${args.icon}></i>`
          : args.iconPosition === 'left'
            ? html`<i slot="icon-left" class=${args.icon}></i>`
            : html`<i slot="icon-right" class=${args.icon}></i>`
        : null}
    </ui-button>
  `,
};

export default meta;

export const Primary: StoryObj<UiButtonArgs> = {};

export const Secondary: StoryObj<UiButtonArgs> = {
  args: { variant: 'secondary' },
};

export const Ghost: StoryObj<UiButtonArgs> = {
  args: { variant: 'ghost' },
};

export const OnlyIcon: StoryObj<UiButtonArgs> = {
  args: {
    variant: 'only-icon',
    hasIcon: true,
    label: 'Favorite',
    icon: 'fa-solid fa-heart',
  },
};

export const Small: StoryObj<UiButtonArgs> = {
  args: { size: 'small' },
};

export const Medium: StoryObj<UiButtonArgs> = {
  args: { size: 'medium' },
};

export const Large: StoryObj<UiButtonArgs> = {
  args: { size: 'large' },
};

