import { Component, Prop, h } from '@stencil/core';

let fieldCounter = 0;

@Component({
  tag: 'input-field',
  styleUrl: 'input-field.css',
  shadow: true,
})
export class InputField {
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

  private generatedId = `input-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

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
