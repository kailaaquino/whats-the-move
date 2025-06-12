import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../styles/reset.css.ts";

export class ActivityCard extends LitElement {
  @property() activity = "Add Activity";
  @property() location = "";
  @property() notes = "";


  override render() {
    return html`
      <div class="card-container">
        <span class="activity-text">${this.activity}</span>
        <span class="activity-text">${this.location}</span>
        <span class="notes">${this.notes}</span>
        <a class="edit-link" href="/app/edit-activity/684a08c64a2bdb006df8951b">Edit</a>

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
        align-items: flex-start;
        gap: 18px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .activity-text {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .notes {
        color: #fff;
        font-family: var(--font-body);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    `,
  ];
}

customElements.define("activity-card", ActivityCard);
