import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type ToggleButtonArgs = {
  inputId: string;
  label: string;
  required: boolean;
  checked: boolean;
  disabled: boolean;
  variant: 'switch' | 'text';
  falseLabel: string;
  trueLabel: string;
};

const meta: Meta<ToggleButtonArgs> = {
  title: 'Misc Generic/Components/Form/Toggle Button',
  component: 'toggle-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toggle button with on/off states and optional label.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: { type: 'radio' },
      options: ['switch', 'text'],
    },
    falseLabel: { control: 'text', if: { arg: 'variant', eq: 'text' } },
    trueLabel: { control: 'text', if: { arg: 'variant', eq: 'text' } },
  },
  args: {
    inputId: 'notifications-toggle',
    label: 'Receive notifications',
    required: false,
    checked: false,
    disabled: false,
    variant: 'switch',
    falseLabel: 'False',
    trueLabel: 'True',
  },
  render: (args) => html`
    <toggle-button
      .inputId=${args.inputId}
      .label=${args.label}
      .required=${args.required}
      .checked=${args.checked}
      .disabled=${args.disabled}
      .variant=${args.variant}
      .falseLabel=${args.falseLabel}
      .trueLabel=${args.trueLabel}
    ></toggle-button>
  `,
};

export default meta;

export const Primary: StoryObj<ToggleButtonArgs> = {};

export const Active: StoryObj<ToggleButtonArgs> = {
  args: {
    checked: true,
  },
};

export const Disabled: StoryObj<ToggleButtonArgs> = {
  args: {
    disabled: true,
  },
};

export const TextToggle: StoryObj<ToggleButtonArgs> = {
  args: {
    variant: 'text',
    label: '',
    falseLabel: 'False',
    trueLabel: 'True',
  },
};