import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type CheckboxFieldArgs = {
  inputId: string;
  label: string;
  hasHelpText: boolean;
  helpText: string;
  errorMessage: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
};

const meta: Meta<CheckboxFieldArgs> = {
  title: 'Misc Generic/Components/Form/Checkbox Field',
  component: 'checkbox-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox field with label, validation states, and supporting help/error text.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
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
    inputId: 'terms-checkbox',
    label: 'I accept terms and conditions',
    checked: false,
    disabled: false,
    required: false,
    invalid: false,
    hasHelpText: false,
    helpText: 'You must accept before continuing.',
    errorMessage: 'Please accept terms and conditions.',
  },
  render: (args) => html`
    <checkbox-field
      .inputId=${args.inputId}
      .label=${args.label}
      .checked=${args.checked}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .helpText=${args.helpText}
      .errorMessage=${args.errorMessage}
    ></checkbox-field>
  `,
};

export default meta;

export const Primary: StoryObj<CheckboxFieldArgs> = {
  args: {
    hasHelpText: true,
  },
};

export const Checked: StoryObj<CheckboxFieldArgs> = {
  args: {
    checked: true,
  },
};

export const Error: StoryObj<CheckboxFieldArgs> = {
  args: {
    invalid: true,
    checked: false,
  },
};


export const Disabled: StoryObj<CheckboxFieldArgs> = {
  args: {
    disabled: true,
  },
};
