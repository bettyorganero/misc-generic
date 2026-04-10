import { Component, Element, Prop, h } from '@stencil/core';

let fieldCounter = 0;

@Component({
  tag: 'input-field',
  styleUrl: 'input-field.css',
  shadow: true,
})
export class InputField {
  @Element() host: HTMLElement;

  @Prop() inputId: string = '';
  @Prop() label: string = '';
  @Prop() helpText: string = '';
  @Prop() errorMessage: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() invalid: boolean = false;
  @Prop() valid: boolean = false;
  @Prop() hasPrefix: boolean = false;
  @Prop() hasSuffix: boolean = true;
  @Prop() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Prop() numberStep: number = 1;
  @Prop() numberMin?: number;
  @Prop() numberMax?: number;

  private generatedId = `input-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

  private get controlElement():
    | (HTMLElement & { value?: string })
    | null {
    const slot = this.host.shadowRoot?.querySelector('slot[name="control"]') as HTMLSlotElement | null;
    const assigned = slot?.assignedElements({ flatten: true }) ?? [];
    return (assigned[0] as HTMLElement & { value?: string }) || null;
  }

  private emitControlValueChange(value: string) {
    const control = this.controlElement;
    if (!control) {
      return;
    }
    control.dispatchEvent(
      new CustomEvent('valueChange', {
        detail: value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private updateNumberValue = (direction: 1 | -1) => {
    const control = this.controlElement;
    if (!control) {
      return;
    }

    const currentRawValue = Number(control.value ?? '0');
    const currentValue = Number.isNaN(currentRawValue) ? 0 : currentRawValue;
    const nextValueUnclamped = currentValue + this.numberStep * direction;
    const min = Number.isFinite(this.numberMin) ? (this.numberMin as number) : -Infinity;
    const max = Number.isFinite(this.numberMax) ? (this.numberMax as number) : Infinity;
    const nextValue = Math.min(max, Math.max(min, nextValueUnclamped));
    const nextValueString = String(nextValue);

    control.value = nextValueString;
    this.emitControlValueChange(nextValueString);
  };

  private onNumberIncrement = (event: MouseEvent) => {
    event.preventDefault();
    this.updateNumberValue(1);
  };

  private onNumberDecrement = (event: MouseEvent) => {
    event.preventDefault();
    this.updateNumberValue(-1);
  };

  render() {
    const isValid = this.valid && !this.invalid;
    const helpId = this.helpText ? `${this.resolvedId}-help` : '';
    const errorId = this.invalid && this.errorMessage ? `${this.resolvedId}-error` : '';

    return (
      <div
        class={`field ${this.invalid ? 'field--invalid' : ''} ${isValid ? 'field--valid' : ''} ${this.disabled ? 'field--disabled' : ''}`}
      >
        {this.label ? (
          <label class="field__label" htmlFor={this.resolvedId}>
            {this.label}
            {this.required ? <span class="field__required">*</span> : null}
          </label>
        ) : null}

        <div class="field__content">

          <div class="field__control">
            {this.hasPrefix ? (
              <span class="field__prefix">
                <slot name="prefix"></slot>
              </span>
            ) : null}

            <div class="field__input">
              <slot name="control" data-input-id={this.resolvedId}></slot>
            </div>

            {this.type === 'number' ? (
              <span class="field__number-stepper" aria-hidden="true">
                <button class="field__number-step-btn" type="button" onClick={this.onNumberIncrement}>
                  <i class="fa-solid fa-chevron-up field__number-chevron"></i>
                </button>
                <button class="field__number-step-btn" type="button" onClick={this.onNumberDecrement}>
                  <i class="fa-solid fa-chevron-down field__number-chevron"></i>
                </button>
              </span>
            ) : null}

            {this.hasSuffix ? (
              <span class="field__suffix">
                <slot name="suffix"></slot>
              </span>
            ) : null}
          </div>

        </div>

        {this.invalid && this.errorMessage ? (
          <p class="field__error" id={errorId} aria-live="polite">
            {this.errorMessage}
          </p>
        ) : this.helpText ? (
          <p class="field__help" id={helpId} aria-live="polite">
            {this.helpText}
          </p>
        ) : null}
      </div>
    );
  }
}
