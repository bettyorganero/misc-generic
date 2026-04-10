import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

let fieldCounter = 0;

@Component({
  tag: 'toggle-button',
  styleUrl: 'toggle-button.css',
  shadow: true,
})
export class ToggleButton {
  @Prop() inputId: string = '';
  @Prop() label: string = '';
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() variant: 'switch' | 'text' = 'switch';
  @Prop() falseLabel: string = 'False';
  @Prop() trueLabel: string = 'True';
  @Prop() required: boolean = false;

  @State() internalChecked: boolean = false;

  @Event() checkedChange: EventEmitter<boolean>;

  private generatedId = `toggle-button-${++fieldCounter}`;

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

  private renderVisual() {
    if (this.variant === 'text') {
      return (
        <span class="toggle__text-track" aria-hidden="true">
          <span class={`toggle__text-thumb ${this.internalChecked ? 'toggle__text-thumb--right' : ''}`}></span>
          <span class={`toggle__text-option ${!this.internalChecked ? 'toggle__text-option--active' : ''}`}>
            {this.falseLabel}
          </span>
          <span class={`toggle__text-option ${this.internalChecked ? 'toggle__text-option--active' : ''}`}>
            {this.trueLabel}
          </span>
        </span>
      );
    }

    return (
      <span class="toggle__track" aria-hidden="true">
        <span class="toggle__thumb"></span>
      </span>
    );
  }

  render() {
    return (
      <Host class={`toggle--${this.variant} ${this.disabled ? 'toggle--disabled' : ''}`}>
        <label class="toggle" htmlFor={this.resolvedId}>
        {this.label ? <span class="toggle__label">{this.label} {this.required ? <span class="field__required">*</span> : null}</span> : null}
          <input
            id={this.resolvedId}
            class="toggle__input"
            type="checkbox"
            checked={this.internalChecked}
            disabled={this.disabled}
            onChange={this.onInputChange}
          />
          {this.renderVisual()}
        </label>
      </Host>
    );
  }
}
