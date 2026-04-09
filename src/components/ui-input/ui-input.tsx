import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-input',
  styleUrl: 'ui-input.css',
  shadow: true,
})
export class UiInput {
  @Prop() inputId: string = '';
  @Prop() name: string = '';
  @Prop() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Prop() placeholder: string = '';
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() autocomplete: string = 'off';
  @Prop() invalid: boolean = false;
  @Prop() valid: boolean = false;
  @Prop() describedBy: string = '';
  @Prop() ariaDescription: string = '';

  @Event() valueChange: EventEmitter<string>;
  @Event() fieldBlur: EventEmitter<void>;
  @Event() fieldFocus: EventEmitter<void>;

  private onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(target.value);
  };

  private onBlur = () => {
    this.fieldBlur.emit();
  };

  private onFocus = () => {
    this.fieldFocus.emit();
  };

  render() {
    return (
      <input
        class={{
          'ui-input': true,
          'ui-input--valid': this.valid && !this.invalid,
        }}
        id={this.inputId || undefined}
        name={this.name || undefined}
        type={this.type}
        placeholder={this.placeholder || undefined}
        value={this.value}
        disabled={this.disabled}
        required={this.required}
        readOnly={this.readonly}
        autoComplete={this.autocomplete}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-describedby={this.describedBy || undefined}
        aria-description={this.ariaDescription || undefined}
        onInput={this.onInput}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}
