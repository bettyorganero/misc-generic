import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

type MultiselectOption = {
  value: string;
  label: string;
};

let fieldCounter = 0;

@Component({
  tag: 'multiselect-field',
  styleUrl: 'multiselect-field.css',
  shadow: true,
})
export class MultiselectField {
  @Prop() inputId: string = '';
  @Prop() label: string = '';
  @Prop() helpText: string = '';
  @Prop() errorMessage: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() invalid: boolean = false;
  @Prop() hasPrefix: boolean = false;
  @Prop() hasSuffix: boolean = true;
  @Prop() placeholder: string = 'Select options';
  @Prop() options: MultiselectOption[] = [];
  @Prop() values: string[] = [];

  @State() selectedValues: string[] = [];

  @Event() valuesChange: EventEmitter<string[]>;

  private generatedId = `multiselect-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

  componentWillLoad() {
    this.selectedValues = [...this.values];
  }

  @Watch('values')
  onValuesPropChange(nextValues: string[]) {
    this.selectedValues = Array.isArray(nextValues) ? [...nextValues] : [];
  }

  private onDropdownValuesChange = (event: CustomEvent<string[]>) => {
    this.selectedValues = [...event.detail];
    this.valuesChange.emit(this.selectedValues);
  };

  render() {
    const hasPrefix = this.hasPrefix !== false && String(this.hasPrefix) !== 'false';
    const hasSuffix = this.hasSuffix !== false && String(this.hasSuffix) !== 'false';
    const helpId = this.helpText ? `${this.resolvedId}-help` : '';
    const errorId = this.invalid && this.errorMessage ? `${this.resolvedId}-error` : '';

    return (
      <div class={`field ${this.invalid ? 'field--invalid' : ''} ${this.disabled ? 'field--disabled' : ''}`}>
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
                multiple={true}
                values={this.selectedValues}
                placeholder={this.placeholder}
                options={this.options}
                disabled={this.disabled}
                noSuffix={!hasSuffix}
                noPrefix={!hasPrefix}
                onValuesChange={this.onDropdownValuesChange}
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
