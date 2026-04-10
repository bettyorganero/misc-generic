import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type InputFieldArgs = {
  inputId: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  helpText: string;
  errorMessage: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  valid: boolean;
  placeholder: string;
  value: string;
  hasPrefix: boolean;
  hasSuffix: boolean;
  numberStep: number;
  numberMin?: number;
  numberMax?: number;
};

const meta: Meta<InputFieldArgs> = {
  title: 'Misc Generic/Components/Form/Input Field',
  component: 'input-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Public component for forms (layout, states, and messages). `ui-input` is internal and is composed here as a base control.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    label: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    valid: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    hasPrefix: { control: 'boolean' },
    hasSuffix: { control: 'boolean' },
    numberStep: { control: 'number', if: { arg: 'type', eq: 'number' } },
    numberMin: { control: 'number', if: { arg: 'type', eq: 'number' } },
    numberMax: { control: 'number', if: { arg: 'type', eq: 'number' } },
    helpText: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
    errorMessage: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
  },
  args: {
    inputId: 'customer-email',
    label: 'Email',
    type: 'email',
    disabled: false,
    required: false,
    invalid: false,
    valid: false,
    placeholder: 'you@example.com',
    value: '',
    hasPrefix: true,
    hasSuffix: true,
    numberStep: 1,
    numberMin: 0,
    numberMax: 100,
    helpText: 'We will never share your email.',
    errorMessage: 'Email is required.',
  },
  render: (args) => html`
    <input-field
      .inputId=${args.inputId}
      .label=${args.label}
      .type=${args.type}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .valid=${args.valid}
      .hasPrefix=${args.hasPrefix}
      .hasSuffix=${args.hasSuffix}
      .numberStep=${args.numberStep}
      .numberMin=${args.numberMin}
      .numberMax=${args.numberMax}
      .helpText=${args.helpText}
      .errorMessage=${args.errorMessage}
    >
      ${args.hasPrefix
        ? html`<i slot="prefix" class=${args.type === 'number' ? 'fa-solid fa-hashtag' : 'fa-solid fa-envelope'}></i>`
        : null}

      <ui-input
        slot="control"
        .inputId=${args.inputId}
        .name=${args.inputId}
        .type=${args.type}
        .placeholder=${args.placeholder}
        .value=${args.value}
        .disabled=${args.disabled}
        .required=${args.required}
        .invalid=${args.invalid}
        .valid=${args.valid}
        .ariaDescription=${args.hasSuffix
          ? args.invalid
            ? args.errorMessage
            : args.helpText
          : ''}
      ></ui-input>

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
    </input-field>
  `,
};

export default meta;

export const Primary: StoryObj<InputFieldArgs> = {};

export const Error: StoryObj<InputFieldArgs> = {
  args: {
    invalid: true,
    value: 'invalid-email',
    hasSuffix: true,
  },
  
};
export const Success: StoryObj<InputFieldArgs> = {
  args: {
    valid: true,
    value: 'correo@dominio.com',
    hasSuffix: true,
    helpText: '',
  },
  
};

export const Disabled: StoryObj<InputFieldArgs> = {
  args: {
    disabled: true,
    hasSuffix: true,
  },
};

export const NumberType: StoryObj<InputFieldArgs> = {
  args: {
    inputId: 'quantity',
    label: 'Quantity',
    type: 'number',
    value: '10',
    placeholder: '0',
    hasPrefix: false,
    hasSuffix: false,
    numberStep: 1,
    numberMin: 0,
    numberMax: 99,
    helpText: 'Choose a quantity.',
  },
};
