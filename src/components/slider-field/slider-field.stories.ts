import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

type SliderFieldArgs = {
  inputId: string;
  label: string;
  required: boolean;
  range: boolean;
  min: number;
  max: number;
  step: number;
  value: number;
  minValue: number;
  maxValue: number;
  disabled: boolean;
};

const meta: Meta<SliderFieldArgs> = {
  title: 'Misc Generic/Components/Form/Slider Field',
  component: 'slider-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Range slider with gray base track and primary progress line.',
      },
    },
  },
  argTypes: {
    inputId: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    range: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'number' },
    minValue: { control: 'number', if: { arg: 'range', eq: true } },
    maxValue: { control: 'number', if: { arg: 'range', eq: true } },
    disabled: { control: 'boolean' },
  },
  args: {
    inputId: 'volume-slider',
    label: 'Volume',
    required: false,
    range: false,
    min: 0,
    max: 100,
    step: 1,
    value: 40,
    minValue: 20,
    maxValue: 80,
    disabled: false,
  },
  render: (args) => html`
    <slider-field
      .inputId=${args.inputId}
      .label=${args.label}
      .required=${args.required}
      .range=${args.range}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .value=${args.value}
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .disabled=${args.disabled}
    ></slider-field>
  `,
};

export default meta;

export const Primary: StoryObj<SliderFieldArgs> = {};

export const Midpoint: StoryObj<SliderFieldArgs> = {
  args: {
    value: 50,
  },
};

export const Range: StoryObj<SliderFieldArgs> = {
  args: {
    range: true,
    minValue: 25,
    maxValue: 70,
  },
};

export const Disabled: StoryObj<SliderFieldArgs> = {
  args: {
    disabled: true,
  },
};
