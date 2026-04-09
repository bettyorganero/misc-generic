import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-button',
  styleUrl: 'ui-button.css',
  shadow: true,
})

export class UiButton {
  @Prop() label: string;
  @Prop() variant: 'primary' | 'secondary' | 'ghost' | 'only-icon' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() iconOnly: boolean = false;
  @Prop() icon: string = '';
  @Prop() iconPosition: 'left' | 'right' = 'left';
  @Prop() fullWidth: boolean = false;
  render() {
    const isOnlyIcon = this.iconOnly || this.variant === 'only-icon';
    const hasIcon = this.icon.trim().length > 0;
    const fallbackIcon = hasIcon ? <i class={this.icon}></i> : null;

    return (
      <button
          class={`btn btn--${this.variant} ${this.size} ${this.fullWidth ? 'w-full' : ''} ${isOnlyIcon ? 'btn--icon-only' : ''}`}
          disabled={this.disabled || this.loading}
          aria-busy={this.loading ? 'true' : undefined}
          type={this.type}
          aria-label={isOnlyIcon ? this.label || undefined : undefined}
        >
          <div class="btn__label">
            {isOnlyIcon ? (
              this.loading ? (
                <span class="btn__loading btn__loading--only-icon" aria-hidden="true">
                  <i class="fa-solid fa-spinner fa-spin"></i>
                </span>
              ) : (
                <slot name="icon-only">{fallbackIcon}</slot>
              )
            ) : (
              <div class="btn__label-text">
                {!this.loading && hasIcon && this.iconPosition === 'left' ? (
                  <span class="btn__icon btn__icon-left">
                    <slot name="icon-left">{fallbackIcon}</slot>
                  </span>
                ) : null}

              
                  <span class="btn__label-text-copy">{this.label}</span>
                

                {this.loading ? (
                  <span class="btn__loading" aria-hidden="true">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                  </span>
                ) : null}

                {!this.loading && hasIcon && this.iconPosition === 'right' ? (
                  <span class="btn__icon btn__icon-right">
                    <slot name="icon-right">{fallbackIcon}</slot>
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </button>
    );
  }
}
