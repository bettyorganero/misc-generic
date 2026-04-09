import { Component, Element, Listen, Prop, State, h } from '@stencil/core';

let fieldCounter = 0;

@Component({
  tag: 'textarea-field',
  styleUrl: 'textarea-field.css',
  shadow: true,
})
export class TextareaField {
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
  /** When greater than 0, shows a character counter (current / maximum) before help or error. */
  @Prop() maxLength: number = 0;

  @Element() el!: HTMLElement;
  @State() characterCount: number = 0;

  private generatedId = `textarea-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

  componentDidRender() {
    this.syncCharacterCountFromControl();
  }

  @Listen('valueChange')
  onValueChange(event: CustomEvent<string>) {
    if (!this.el.contains(event.target as Node)) {
      return;
    }
    const detail = event.detail;
    this.characterCount = typeof detail === 'string' ? detail.length : 0;
  }

  private syncCharacterCountFromControl() {
    if (this.maxLength <= 0) {
      return;
    }
    const control = this.el.querySelector('ui-textarea');
    if (!control || !('value' in control)) {
      return;
    }
    const v = String((control as unknown as { value: string }).value ?? '');
    const next = v.length;
    if (next !== this.characterCount) {
      this.characterCount = next;
    }
  }

  render() {
    const isValid = this.valid && !this.invalid;
    const helpId = this.helpText ? `${this.resolvedId}-help` : '';
    const errorId = this.invalid && this.errorMessage ? `${this.resolvedId}-error` : '';
    const counterId = this.maxLength > 0 ? `${this.resolvedId}-counter` : '';
    const showCounter = this.maxLength > 0;
    const showHelp = !this.invalid && !!this.helpText;
    const showError = this.invalid && !!this.errorMessage;
    const showFooter = showCounter || showHelp || showError;

    return (
      <div
        class={`field field--textarea ${this.invalid ? 'field--invalid' : ''} ${isValid ? 'field--valid' : ''} ${this.disabled ? 'field--disabled' : ''}`}
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

        {showFooter ? (
          <div class="field__footer">
            {showCounter ? (
              <span class="field__counter" id={counterId} aria-live="polite">
                {this.characterCount}/{this.maxLength}
              </span>
            ) : null}
            {showError ? (
              <p class="field__error" id={errorId} aria-live="polite">
                {this.errorMessage}
              </p>
            ) : showHelp ? (
              <p class="field__help" id={helpId} aria-live="polite">
                {this.helpText}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
