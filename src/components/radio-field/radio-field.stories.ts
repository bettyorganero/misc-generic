import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type RadioFieldArgs = {
  inputId: string;
  name: string;
  value: string;
  label: string;
  hasHelpText: boolean;
  helpText: string;
  errorMessage: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
};

const meta: Meta<RadioFieldArgs> = {
  title: 'Misc Generic/Components/Form/Radio Field',
  component: 'radio-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Radio field with label, validation states, and supporting help/error text.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    hasHelpText: { control: 'boolean' },
    helpText: { control: 'text', if: { arg: 'hasHelpText', eq: true } },
    errorMessage: { control: 'text' },
  },
  args: {
    inputId: 'contact-radio-email',
    name: 'contact-method',
    value: 'email',
    label: 'Email',
    checked: false,
    disabled: false,
    required: false,
    invalid: false,
    hasHelpText: false,
    helpText: 'Select your preferred contact method.',
    errorMessage: 'Please select an option.',
  },
  render: (args) => html`
    <radio-field
      .inputId=${args.inputId}
      .name=${args.name}
      .value=${args.value}
      .label=${args.label}
      .checked=${args.checked}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .helpText=${args.hasHelpText ? args.helpText : ''}
      .errorMessage=${args.errorMessage}
    ></radio-field>
  `,
};

export default meta;

export const Primary: StoryObj<RadioFieldArgs> = {
  args: {
    hasHelpText: true,
  },
};

export const Checked: StoryObj<RadioFieldArgs> = {
  args: {
    checked: true,
  },
};

export const Error: StoryObj<RadioFieldArgs> = {
  args: {
    invalid: true,
    checked: false,
  },
};

export const Disabled: StoryObj<RadioFieldArgs> = {
  args: {
    disabled: true,
  },
};
