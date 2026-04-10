import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

let fieldCounter = 0;
type SliderThumb = 'single' | 'min' | 'max';

@Component({
  tag: 'slider-field',
  styleUrl: 'slider-field.css',
  shadow: true,
})
export class SliderField {
  @Prop() inputId: string = '';
  @Prop() label: string = '';
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() step: number = 1;
  @Prop() value: number = 50;
  @Prop() range: boolean = false;
  @Prop() minValue: number = 25;
  @Prop() maxValue: number = 75;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;

  @State() internalValue: number = 50;
  @State() internalMinValue: number = 25;
  @State() internalMaxValue: number = 75;
  @State() isSliding: boolean = false;
  @State() activeThumb: SliderThumb | null = null;

  @Event() valueChange: EventEmitter<number>;
  @Event() rangeChange: EventEmitter<{ min: number; max: number }>;

  private generatedId = `slider-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

  private get progress(): number {
    const range = this.max - this.min;
    if (range <= 0) {
      return 0;
    }
    const clamped = Math.min(this.max, Math.max(this.min, this.internalValue));
    return ((clamped - this.min) / range) * 100;
  }

  private get minProgress(): number {
    const range = this.max - this.min;
    if (range <= 0) {
      return 0;
    }
    return ((this.internalMinValue - this.min) / range) * 100;
  }

  private get maxProgress(): number {
    const range = this.max - this.min;
    if (range <= 0) {
      return 0;
    }
    return ((this.internalMaxValue - this.min) / range) * 100;
  }

  componentWillLoad() {
    this.internalValue = this.value;
    this.syncRangeValues(this.minValue, this.maxValue);
  }

  @Watch('value')
  onValuePropChange(nextValue: number) {
    this.internalValue = nextValue;
  }

  @Watch('minValue')
  onMinValuePropChange(nextValue: number) {
    this.syncRangeValues(nextValue, this.internalMaxValue);
  }

  @Watch('maxValue')
  onMaxValuePropChange(nextValue: number) {
    this.syncRangeValues(this.internalMinValue, nextValue);
  }

  @Watch('range')
  onRangePropChange(nextValue: boolean) {
    if (nextValue) {
      this.syncRangeValues(this.minValue, this.maxValue);
    }
  }

  @Watch('min')
  @Watch('max')
  onBoundsChange() {
    this.internalValue = this.clamp(this.internalValue);
    this.syncRangeValues(this.internalMinValue, this.internalMaxValue);
  }

  private clamp(value: number, lower: number = this.min, upper: number = this.max): number {
    return Math.min(upper, Math.max(lower, value));
  }

  private parseInputValue(event: Event): number | null {
    const target = event.target as HTMLInputElement;
    const parsed = Number(target.value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private emitRangeChange() {
    this.rangeChange.emit({ min: this.internalMinValue, max: this.internalMaxValue });
  }

  private startSliding(thumb: SliderThumb) {
    this.isSliding = true;
    this.activeThumb = thumb;
  }

  private stopSliding() {
    this.isSliding = false;
    this.activeThumb = null;
  }

  private syncRangeValues = (nextMinValue: number, nextMaxValue: number) => {
    const safeMinValue = Number.isFinite(nextMinValue) ? nextMinValue : this.min;
    const safeMaxValue = Number.isFinite(nextMaxValue) ? nextMaxValue : this.max;
    const clampedMin = this.clamp(safeMinValue);
    const clampedMax = this.clamp(safeMaxValue);
    this.internalMinValue = Math.min(clampedMin, clampedMax);
    this.internalMaxValue = Math.max(clampedMin, clampedMax);
  };

  private onInput = (event: Event) => {
    const nextValue = this.parseInputValue(event);
    if (nextValue === null) {
      return;
    }
    const clampedValue = this.clamp(nextValue);
    this.internalValue = clampedValue;
    this.startSliding('single');
    this.valueChange.emit(clampedValue);
  };

  private onManualInput = (event: Event) => {
    const rawValue = this.parseInputValue(event);
    if (rawValue === null) {
      return;
    }

    const clampedValue = this.clamp(rawValue);
    this.internalValue = clampedValue;
    this.valueChange.emit(clampedValue);
  };

  private onMinManualInput = (event: Event) => {
    const rawValue = this.parseInputValue(event);
    if (rawValue === null) {
      return;
    }

    const clampedValue = this.clamp(rawValue, this.min, this.internalMaxValue);
    this.internalMinValue = clampedValue;
    this.emitRangeChange();
  };

  private onMaxManualInput = (event: Event) => {
    const rawValue = this.parseInputValue(event);
    if (rawValue === null) {
      return;
    }

    const clampedValue = this.clamp(rawValue, this.internalMinValue, this.max);
    this.internalMaxValue = clampedValue;
    this.emitRangeChange();
  };

  private onMinInput = (event: Event) => {
    const nextValue = this.parseInputValue(event);
    if (nextValue === null) {
      return;
    }
    const clampedValue = this.clamp(nextValue, this.min, this.internalMaxValue);
    this.internalMinValue = clampedValue;
    this.startSliding('min');
    this.emitRangeChange();
  };

  private onMaxInput = (event: Event) => {
    const nextValue = this.parseInputValue(event);
    if (nextValue === null) {
      return;
    }
    const clampedValue = this.clamp(nextValue, this.internalMinValue, this.max);
    this.internalMaxValue = clampedValue;
    this.startSliding('max');
    this.emitRangeChange();
  };

  private onPointerDown = () => {
    this.startSliding('single');
  };

  private onPointerUp = () => {
    this.stopSliding();
  };

  private onBlur = () => {
    this.stopSliding();
  };

  private onMinPointerDown = () => {
    this.startSliding('min');
  };

  private onMaxPointerDown = () => {
    this.startSliding('max');
  };

  private createStepHandler(
    direction: 1 | -1,
    target: 'single' | 'min' | 'max',
  ): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      event.preventDefault();
      const delta = this.step * direction;

      if (target === 'single') {
        const nextValue = this.clamp(this.internalValue + delta);
        this.internalValue = nextValue;
        this.valueChange.emit(nextValue);
        return;
      }

      if (target === 'min') {
        const nextValue = this.clamp(this.internalMinValue + delta, this.min, this.internalMaxValue);
        this.internalMinValue = nextValue;
        this.emitRangeChange();
        return;
      }

      const nextValue = this.clamp(this.internalMaxValue + delta, this.internalMinValue, this.max);
      this.internalMaxValue = nextValue;
      this.emitRangeChange();
    };
  }

  private onSingleIncrement = this.createStepHandler(1, 'single');
  private onSingleDecrement = this.createStepHandler(-1, 'single');
  private onMinIncrement = this.createStepHandler(1, 'min');
  private onMinDecrement = this.createStepHandler(-1, 'min');
  private onMaxIncrement = this.createStepHandler(1, 'max');
  private onMaxDecrement = this.createStepHandler(-1, 'max');

  private renderStepper(
    onIncrement: (event: MouseEvent) => void,
    onDecrement: (event: MouseEvent) => void,
  ) {
    return (
      <div class="slider__stepper" aria-hidden="true">
        <button
          class="slider__stepper-btn slider__stepper-btn--up"
          type="button"
          disabled={this.disabled}
          onClick={onIncrement}
        >
          <span class="slider__chevron slider__chevron--up"></span>
        </button>
        <button
          class="slider__stepper-btn slider__stepper-btn--down"
          type="button"
          disabled={this.disabled}
          onClick={onDecrement}
        >
          <span class="slider__chevron slider__chevron--down"></span>
        </button>
      </div>
    );
  }

  private renderManualControl(
    value: number,
    min: number,
    max: number,
    onInput: (event: Event) => void,
    onIncrement: (event: MouseEvent) => void,
    onDecrement: (event: MouseEvent) => void,
  ) {
    return (
      <div class="slider__manual-control">
        <input
          class="slider__manual-input"
          type="number"
          min={min}
          max={max}
          step={this.step}
          value={value}
          disabled={this.disabled}
          onInput={onInput}
        />
        {this.renderStepper(onIncrement, onDecrement)}
      </div>
    );
  }

  render() {
    const sliderStyle = {
      '--slider-progress': `${this.progress}%`,
    };
    const rangeTrackStyle = {
      '--range-start': `${this.minProgress}%`,
      '--range-end': `${this.maxProgress}%`,
    };
    const tooltipStyle = {
      left: `${this.progress}%`,
    };
    const minTooltipStyle = {
      left: `${this.minProgress}%`,
    };
    const maxTooltipStyle = {
      left: `${this.maxProgress}%`,
    };

    return (
      <Host class={this.disabled ? 'slider--disabled' : ''}>
        <label class="slider" htmlFor={this.resolvedId}>
          {this.label ? (
            <span class="field__label">
              {this.label}
              {this.required ? <span class="field__required">*</span> : null}
            </span>
          ) : null}
          {this.range ? (
            <div class="slider__range-wrapper slider__range-wrapper--double" style={rangeTrackStyle}>
              {this.isSliding && this.activeThumb === 'min' ? (
                <span class="slider__tooltip" style={minTooltipStyle}>
                  {this.internalMinValue}
                </span>
              ) : null}
              {this.isSliding && this.activeThumb === 'max' ? (
                <span class="slider__tooltip" style={maxTooltipStyle}>
                  {this.internalMaxValue}
                </span>
              ) : null}
              <div class="slider__range-base" aria-hidden="true"></div>
              <div class="slider__range-active" aria-hidden="true"></div>
              <input
                id={`${this.resolvedId}-min`}
                class="slider__double-input"
                type="range"
                required={this.required}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.internalMinValue}
                disabled={this.disabled}
                onInput={this.onMinInput}
                onPointerDown={this.onMinPointerDown}
                onPointerUp={this.onPointerUp}
                onBlur={this.onBlur}
              />
              <input
                id={`${this.resolvedId}-max`}
                class="slider__double-input"
                type="range"
                required={this.required}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.internalMaxValue}
                disabled={this.disabled}
                onInput={this.onMaxInput}
                onPointerDown={this.onMaxPointerDown}
                onPointerUp={this.onPointerUp}
                onBlur={this.onBlur}
              />
            </div>
          ) : (
            <div class="slider__range-wrapper">
              {this.isSliding ? (
                <span class="slider__tooltip" style={tooltipStyle}>
                  {this.internalValue}
                </span>
              ) : null}
              <input
                id={this.resolvedId}
                class="slider__input"
                type="range"
                required={this.required}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.internalValue}
                disabled={this.disabled}
                style={sliderStyle}
                onInput={this.onInput}
                onPointerDown={this.onPointerDown}
                onPointerUp={this.onPointerUp}
                onBlur={this.onBlur}
              />
            </div>
          )}
          <div class="slider__limits" aria-hidden="true">
            <span>{this.min}</span>
            <span>{this.max}</span>
          </div>
          {!this.range ? (
            this.renderManualControl(
              this.internalValue,
              this.min,
              this.max,
              this.onManualInput,
              this.onSingleIncrement,
              this.onSingleDecrement,
            )
          ) : (
            <div class="slider__range-manuals">
              {this.renderManualControl(
                this.internalMinValue,
                this.min,
                this.internalMaxValue,
                this.onMinManualInput,
                this.onMinIncrement,
                this.onMinDecrement,
              )}
              {this.renderManualControl(
                this.internalMaxValue,
                this.internalMinValue,
                this.max,
                this.onMaxManualInput,
                this.onMaxIncrement,
                this.onMaxDecrement,
              )}
            </div>
          )}
        </label>
      </Host>
    );
  }
}
