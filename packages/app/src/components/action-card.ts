import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../../public/styles/reset.css.js";

/* GroupCard components are used within friend groups to represent actions to take */
export class ActionCard extends LitElement {
  @property() href = "";
  @property() label = "";

  override render() {
    return html`
      <div class="group-container">
        <a href=${this.href} class="group-title">
          <slot>${this.label}</slot>
        </a>
      </div>
    `;
  }

  static styles = [
    reset,
    css`
      .group-container {
        width: 300px;
        height: 300px;
        background-color: var(--color-bg-nav);
        display: flex;
        align-items: center; /* vertical center */
        justify-content: center; /* horizontal center */
        overflow: hidden;
        border-radius: var(--radius-sm);
        padding: var(--space-sm);
      }

      .group-title {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        overflow: hidden;
        text-align: center;
        color: var(--color-text-primary);
      }
    `,
  ];
}
