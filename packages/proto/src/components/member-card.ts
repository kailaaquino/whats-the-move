import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";

/* Used for members page */
export class MemberCard extends LitElement {
  @property() firstName = "";
  @property() lastName = "";

  override render() {
    const initial = this.firstName?.charAt(0).toUpperCase() ?? "";

    return html`
      <div class="container">
        <div class="content-container">
          <member-circle .initial=${initial}></member-circle>
          <div class="text-container">
            <span class="text-style">${this.firstName}</span>
            <span class="text-style">${this.lastName}</span>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    reset.styles,
    css`
      .container {
        display: flex;
        width: 235px;
        height: 235px;
        padding: 23px 4px 59px 0px;
        align-items: center;
        flex-shrink: 0;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .text-style {
        font-family: var(--font-body);
        font-size: var(--size-font-body);
        color: var(--color-text-primary);
      }
      .text-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
      }
      .content-container {
        display: flex;
        width: 231px;
        padding: 8px;
        flex-direction: column;
        align-items: center;
        gap: 47px;
        flex-shrink: 0;
      }
    `,
  ];
}
