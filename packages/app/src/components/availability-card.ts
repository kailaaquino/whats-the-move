import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";

export class AvailabilityCard extends LitElement {
  @property() memberName = "Add Availability";
  @property() date = "";

  override render() {
    return html`
      <div class="card-container">
        <span class="text">${this.memberName}</span>
        <span class="text">${this.date}</span>
      </div>
    `;
  }

  static styles = [
    reset,
    css`
      .card-container {
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: left;
        gap: 8px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .text {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

    `,
  ];
}
