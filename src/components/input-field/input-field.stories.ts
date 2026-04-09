import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type InputFieldArgs = {
  inputId: string;
  label: string;
  helpText: string;
  errorMessage: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  valid: boolean;
  placeholder: string;
  value: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  hasPrefix: boolean;
  hasSuffix: boolean;
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
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    valid: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    hasPrefix: { control: 'boolean' },
    hasSuffix: { control: 'boolean' },
    helpText: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
    errorMessage: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
  },
  args: {
    inputId: 'customer-email',
    label: 'Email',
    disabled: false,
    required: false,
    invalid: false,
    valid: false,
    placeholder: 'you@example.com',
    value: '',
    type: 'email',
    hasPrefix: true,
    hasSuffix: true,
    helpText: 'We will never share your email.',
    errorMessage: 'Email is required.',
  },
  render: (args) => html`
    <input-field
      .inputId=${args.inputId}
      .label=${args.label}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .valid=${args.valid}
      .hasPrefix=${args.hasPrefix}
      .hasSuffix=${args.hasSuffix}
      .helpText=${args.hasSuffix ? args.helpText : ''}
      .errorMessage=${args.hasSuffix ? args.errorMessage : ''}
    >
      ${args.hasPrefix ? html`<i slot="prefix" class="fa-solid fa-envelope"></i>` : null}

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
