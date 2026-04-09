import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type MultiselectFieldArgs = {
  inputId: string;
  label: string;
  helpText: string;
  errorMessage: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  values: string[];
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

const meta: Meta<MultiselectFieldArgs> = {
  title: 'Misc Generic/Components/Form/Multiselect Field',
  component: 'multiselect-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Public component for multi-selection with dropdown checkboxes, field states, and support messages.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    values: {
      control: { type: 'check' },
      options: ['general', 'billing', 'support', 'sales'],
    },
    placeholder: { control: 'text' },
    hasPrefix: { control: 'boolean' },
    hasSuffix: { control: 'boolean' },
    helpText: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
    errorMessage: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
  },
  args: {
    inputId: 'contact-topics',
    label: 'Topics',
    disabled: false,
    required: false,
    invalid: false,
    values: [],
    placeholder: 'Select topics',
    hasPrefix: true,
    hasSuffix: true,
    helpText: 'Choose one or more topics.',
    errorMessage: 'Please select at least one topic.',
  },
  render: (args) => html`
    <multiselect-field
      .inputId=${args.inputId}
      .label=${args.label}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .values=${args.values}
      .placeholder=${args.placeholder}
      .options=${TOPIC_OPTIONS}
      .hasPrefix=${args.hasPrefix}
      .hasSuffix=${args.hasSuffix}
      .helpText=${args.hasSuffix ? args.helpText : ''}
      .errorMessage=${args.hasSuffix ? args.errorMessage : ''}
    >
      ${args.hasPrefix ? html`<i slot="prefix" class="fa-solid fa-list-check"></i>` : null}

      ${args.hasSuffix
        ? html`<i
            slot="suffix"
            class=${args.invalid ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-info'}
          ></i>`
        : null}
    </multiselect-field>
  `,
};

export default meta;

export const Primary: StoryObj<MultiselectFieldArgs> = {};

export const WithValues: StoryObj<MultiselectFieldArgs> = {
  args: {
    values: ['general', 'support'],
  },
};

export const Error: StoryObj<MultiselectFieldArgs> = {
  args: {
    invalid: true,
    values: [],
  },
};

export const Disabled: StoryObj<MultiselectFieldArgs> = {
  args: {
    disabled: true,
    values: ['billing'],
  },
};
