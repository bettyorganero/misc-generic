import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

type SelectFieldOption = {
  value: string;
  label: string;
};

let fieldCounter = 0;

@Component({
  tag: 'select-field',
  styleUrl: 'select-field.css',
  shadow: true,
})
export class SelectField {
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
  @Prop() value: string = '';
  @Prop() placeholder: string = 'Select one option';
  @Prop() options: SelectFieldOption[] = [];

  @State() selectedValue: string = '';

  @Event() valueChange: EventEmitter<string>;

  private generatedId = `select-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

  componentWillLoad() {
    this.selectedValue = this.value;
  }

  @Watch('value')
  onValuePropChange(nextValue: string) {
    this.selectedValue = nextValue;
  }

  private onDropdownValueChange = (event: CustomEvent<string>) => {
    const nextValue = event.detail;
    this.selectedValue = nextValue;
    this.valueChange.emit(nextValue);
  };

  render() {
    const isValid = this.valid && !this.invalid;
    const hasPrefix = this.hasPrefix !== false && String(this.hasPrefix) !== 'false';
    const hasSuffix = this.hasSuffix !== false && String(this.hasSuffix) !== 'false';
    const helpId = this.helpText ? `${this.resolvedId}-help` : '';
    const errorId = this.invalid && this.errorMessage ? `${this.resolvedId}-error` : '';

    return (
      <div
        class={`field ${this.invalid ? 'field--invalid' : ''} ${isValid ? 'field--valid' : ''} ${this.disabled ? 'field--disabled' : ''} ${!hasSuffix ? 'field--no-suffix' : ''}`}
      >
        {this.label ? (
          <label class="field__label" htmlFor={this.resolvedId}>
            {this.label}
            {this.required ? <span class="field__required">*</span> : null}
          </label>
        ) : null}

        <div class="field__content">
          <div class="field__control">
            {hasPrefix ? (
              <span class="field__prefix">
                <slot name="prefix"></slot>
              </span>
            ) : null}

            <div class="field__input">
              <ui-dropdown
                value={this.selectedValue}
                placeholder={this.placeholder}
                options={this.options}
                disabled={this.disabled}
                noSuffix={!hasSuffix}
                noPrefix={!hasPrefix}
                onValueChange={this.onDropdownValueChange}
              ></ui-dropdown>
            </div>

            {hasSuffix ? (
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
