import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

export type DropdownOption = {
  value: string;
  label: string;
};

@Component({
  tag: 'ui-dropdown',
  styleUrl: 'ui-dropdown.css',
  shadow: true,
})
export class UiDropdown {
  @Element() el!: HTMLElement;

  @Prop() options: DropdownOption[] = [];
  @Prop() placeholder: string = 'Select one option';
  @Prop() disabled: boolean = false;
  @Prop() multiple: boolean = false;
  @Prop() value: string = '';
  @Prop() values: string[] = [];
  @Prop() noSuffix: boolean = false;
  @Prop() noPrefix: boolean = false;

  @State() isOpen: boolean = false;
  @State() selectedValue: string = '';
  @State() selectedValues: string[] = [];

  @Event() valueChange: EventEmitter<string>;
  @Event() valuesChange: EventEmitter<string[]>;

  private triggerEl?: HTMLButtonElement;

  componentWillLoad() {
    this.selectedValue = this.value;
    this.selectedValues = [...this.values];
  }

  connectedCallback() {
    document.addEventListener('pointerdown', this.onDocumentPointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onDocumentPointerDown);
  }

  @Watch('value')
  onValuePropChange(nextValue: string) {
    this.selectedValue = nextValue;
  }

  @Watch('values')
  onValuesPropChange(nextValues: string[]) {
    this.selectedValues = Array.isArray(nextValues) ? [...nextValues] : [];
  }

  private get selectedLabel(): string {
    const match = this.options.find(option => option.value === this.selectedValue);
    return match?.label || this.placeholder;
  }

  private get selectedSummary(): string {
    if (this.selectedValues.length === 0) {
      return this.placeholder;
    }
    if (this.selectedValues.length === 1) {
      const match = this.options.find(option => option.value === this.selectedValues[0]);
      return match?.label || this.placeholder;
    }
    return `${this.selectedValues.length} selected`;
  }

  private onToggleOpen = () => {
    if (this.disabled) {
      this.closeDropdown();
      return;
    }
    if (this.isOpen) {
      this.closeDropdown(true);
      return;
    }
    this.isOpen = true;
  };

  private onSelectSingle = (nextValue: string) => {
    this.selectedValue = nextValue;
    this.closeDropdown();
    this.valueChange.emit(nextValue);
  };

  private onToggleMulti = (nextValue: string) => {
    const current = new Set(this.selectedValues);
    if (current.has(nextValue)) {
      current.delete(nextValue);
    } else {
      current.add(nextValue);
    }
    this.selectedValues = [...current];
    this.valuesChange.emit(this.selectedValues);
  };

  private closeDropdown(blurTrigger: boolean = false) {
    this.isOpen = false;
    if (blurTrigger) {
      this.triggerEl?.blur();
    }
  }

  private onDocumentPointerDown = (event: PointerEvent) => {
    if (!this.isOpen) {
      return;
    }
    const path = event.composedPath();
    const clickedInside = path.includes(this.el);
    if (!clickedInside) {
      this.closeDropdown(true);
    }
  };

  render() {
    return (
      <div class={`dropdown ${this.noSuffix ? 'dropdown--no-suffix' : ''} ${this.noPrefix ? 'dropdown--no-prefix' : ''}`}>
        <button
          class="dropdown__trigger"
          type="button"
          aria-expanded={this.isOpen ? 'true' : 'false'}
          disabled={this.disabled}
          onClick={this.onToggleOpen}
          ref={el => (this.triggerEl = el as HTMLButtonElement)}
        >
          <span>{this.multiple ? this.selectedSummary : this.selectedLabel}</span>
          <i
            class={`fa-solid fa-chevron-down dropdown__chevron ${this.isOpen ? 'dropdown__chevron--open' : ''}`}
            aria-hidden="true"
          ></i>
        </button>

        <ul class={`dropdown__menu ${this.isOpen ? 'dropdown__menu--open' : ''}`} role="listbox">
          {this.options.map(option => {
            const isSelected = this.multiple
              ? this.selectedValues.includes(option.value)
              : option.value === this.selectedValue;
            return (
              <li class="dropdown__item">
                <button
                  class="dropdown__option"
                  type="button"
                  role="option"
                  aria-selected={isSelected ? 'true' : 'false'}
                  onClick={() =>
                    this.multiple ? this.onToggleMulti(option.value) : this.onSelectSingle(option.value)
                  }
                >
                  {this.multiple ? (
                    <span class={`dropdown__checkbox ${isSelected ? 'dropdown__checkbox--checked' : ''}`}>
                      <i class="fa-solid fa-check dropdown__check-icon"></i>
                    </span>
                  ) : null}
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
