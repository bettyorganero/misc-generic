import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type TextareaFieldArgs = {
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
  rows: number;
  maxLength: number;
  hasPrefix: boolean;
  hasSuffix: boolean;
};

const meta: Meta<TextareaFieldArgs> = {
  title: 'Misc Generic/Components/Form/Textarea Field',
  component: 'textarea-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multiline text field for forms (same pattern as `input-field`). `ui-textarea` is an internal control; compose here with slots prefix/suffix.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    label: { control: 'text' },
    helpText: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
    errorMessage: { control: 'text', if: { arg: 'hasSuffix', eq: true } },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    valid: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 12, step: 1 } },
    maxLength: { control: { type: 'number', min: 0, max: 500, step: 1 } },
    hasPrefix: { control: 'boolean' },
    hasSuffix: { control: 'boolean' },
  },
  args: {
    inputId: 'message-body',
    label: 'Message',
    helpText: 'Describe your request in a few lines.',
    errorMessage: 'This field is required.',
    disabled: false,
    required: false,
    invalid: false,
    valid: false,
    placeholder: 'Write here…',
    value: '',
    rows: 4,
    maxLength: 0,
    hasPrefix: true,
    hasSuffix: true,
  },
  render: (args) => html`
    <textarea-field
      .inputId=${args.inputId}
      .label=${args.label}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
      .valid=${args.valid}
      .hasPrefix=${args.hasPrefix}
      .hasSuffix=${args.hasSuffix}
      .maxLength=${args.maxLength}
      .helpText=${args.hasSuffix ? args.helpText : ''}
      .errorMessage=${args.hasSuffix ? args.errorMessage : ''}
    >
      ${args.hasPrefix ? html`<i slot="prefix" class="fa-solid fa-align-left"></i>` : null}

      <ui-textarea
        slot="control"
        .inputId=${args.inputId}
        .name=${args.inputId}
        .rows=${args.rows}
        .maxLength=${args.maxLength > 0 ? args.maxLength : undefined}
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
      ></ui-textarea>

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
    </textarea-field>
  `,
};

export default meta;

export const Primary: StoryObj<TextareaFieldArgs> = {};

export const Error: StoryObj<TextareaFieldArgs> = {
  args: {
    invalid: true,
    value: 'too short',
    hasSuffix: true,
  },
};

export const Success: StoryObj<TextareaFieldArgs> = {
  args: {
    valid: true,
    value: '',
    rows: 5,
    maxLength: 40,
    hasSuffix: true,
    helpText: 'Describe your request in a few lines.',
  },
};

export const Disabled: StoryObj<TextareaFieldArgs> = {
  args: {
    disabled: true,
    hasSuffix: true,
  },
};
