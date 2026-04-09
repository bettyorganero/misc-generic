import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-textarea',
  styleUrl: 'ui-textarea.css',
  shadow: true,
})
export class UiTextarea {
  @Prop() inputId: string = '';
  @Prop() name: string = '';
  @Prop() placeholder: string = '';
  @Prop({ mutable: true }) value: string = '';
  @Prop() rows: number = 3;
  /** HTML `maxlength`; use with `textarea-field` when showing a maximum character counter. */
  @Prop() maxLength?: number;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() invalid: boolean = false;
  @Prop() valid: boolean = false;
  @Prop() ariaDescription: string = '';

  @Event() valueChange: EventEmitter<string>;
  @Event() fieldBlur: EventEmitter<void>;
  @Event() fieldFocus: EventEmitter<void>;

  private onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
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
      <textarea
        class={{
          'ui-textarea': true,
          'ui-textarea--valid': this.valid && !this.invalid,
        }}
        id={this.inputId || undefined}
        name={this.name || undefined}
        placeholder={this.placeholder || undefined}
        rows={this.rows}
        maxLength={this.maxLength != null && this.maxLength > 0 ? this.maxLength : undefined}
        value={this.value}
        disabled={this.disabled}
        required={this.required}
        readOnly={this.readonly}
        aria-invalid={this.invalid ? 'true' : undefined}
        aria-description={this.ariaDescription || undefined}
        onInput={this.onInput}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}
