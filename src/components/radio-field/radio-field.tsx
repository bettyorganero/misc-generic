import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

let fieldCounter = 0;

@Component({
  tag: 'radio-field',
  styleUrl: 'radio-field.css',
  shadow: true,
})
export class RadioField {
  @Prop() inputId: string = '';
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() label: string = '';
  @Prop() helpText: string = '';
  @Prop() errorMessage: string = '';
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() invalid: boolean = false;

  @State() internalChecked: boolean = false;

  @Event() checkedChange: EventEmitter<boolean>;

  private generatedId = `radio-field-${++fieldCounter}`;

  private get resolvedId(): string {
    return this.inputId || this.generatedId;
  }

  componentWillLoad() {
    this.internalChecked = this.checked;
  }

  @Watch('checked')
  onCheckedChange(nextValue: boolean) {
    this.internalChecked = nextValue;
  }

  private onInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.internalChecked = target.checked;
    this.checkedChange.emit(target.checked);
  };

  render() {
    const helpId = this.helpText ? `${this.resolvedId}-help` : '';
    const errorId = this.invalid && this.errorMessage ? `${this.resolvedId}-error` : '';

    return (
      <div
        class={`field ${this.invalid ? 'field--invalid' : ''} ${this.disabled ? 'field--disabled' : ''}`}
      >
        <label class="field__control" htmlFor={this.resolvedId}>
          <input
            id={this.resolvedId}
            class="field__radio"
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.internalChecked}
            disabled={this.disabled}
            required={this.required}
            aria-invalid={this.invalid ? 'true' : undefined}
            onChange={this.onInputChange}
          />
          <span class="field__circle" aria-hidden="true">
            <span class="field__dot"></span>
          </span>
          <span class="field__label">
            {this.label}
            {this.required ? <span class="field__required">*</span> : null}
          </span>
        </label>

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
