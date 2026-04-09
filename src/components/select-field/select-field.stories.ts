import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type SelectFieldArgs = {
  inputId: string;
  label: string;
  helpText: string;
  errorMessage: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  valid: boolean;
  value: string;
  placeholder: string;
  hasPrefix: boolean;
  hasSuffix: boolean;
};

const TOPIC_OPTIONS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'billing', label: 'Billing' },
  { value: 'support', label: 'Technical support' },
  { value: 'sales', label: 'Sales' },
];

const meta: Meta<SelectFieldArgs> = {
  title: 'Misc Generic/Components/Form/Select Field',
  component: 'select-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Public component for select fields (layout, states, and messages). It composes a custom dropdown base inside the control slot.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    valid: { control: 'boolean' },
    value: {
      control: { type: 'select' },
      options: ['', 'general', 'billing', 'support', 'sales'],
    },
    placeholder: { control: 'text' },
    hasPrefix: { control: 'boolean' },
    hasSuffix: { control: 'boolean' },
    helpText: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
    errorMessage: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
  },
  args: {
    inputId: 'contact-topic',
    label: 'Topic',
    disabled: false,
    required: false,
    invalid: false,
    valid: false,
    value: '',
    placeholder: 'Select one option',
    hasPrefix: true,
    hasSuffix: true,
    helpText: 'Choose the topic for your request.',
    errorMessage: 'Please choose a topic.',
  },
  render: (args) => html`
    <select-field
      .inputId=${args.inputId}
      .label=${args.label}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .valid=${args.valid}
      .value=${args.value}
      .placeholder=${args.placeholder}
      .options=${TOPIC_OPTIONS}
      .hasPrefix=${args.hasPrefix}
      .hasSuffix=${args.hasSuffix}
      .helpText=${args.hasSuffix ? args.helpText : ''}
      .errorMessage=${args.hasSuffix ? args.errorMessage : ''}
    >
      ${args.hasPrefix ? html`<i slot="prefix" class="fa-solid fa-list"></i>` : null}

      ${args.hasSuffix
        ? html`<i
            slot="suffix"
            class=${args.invalid
              ? 'fa-solid fa-circle-xmark'
              : args.valid
                ? 'fa-solid fa-circle-check'
                : 'fa-solid fa-circle-info'}
          ></i>`
        : null}
    </select-field>
  `,
};

export default meta;

export const Primary: StoryObj<SelectFieldArgs> = {};

export const Error: StoryObj<SelectFieldArgs> = {
  args: {
    invalid: true,
    hasSuffix: true,
  },
};

export const Success: StoryObj<SelectFieldArgs> = {
  args: {
    valid: true,
    value: 'support',
    hasSuffix: true,
    helpText: '',
  },
};

export const Disabled: StoryObj<SelectFieldArgs> = {
  args: {
    disabled: true,
    hasSuffix: true,
  },
};
