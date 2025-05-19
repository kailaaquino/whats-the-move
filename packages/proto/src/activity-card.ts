import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class ActivityCard extends LitElement {
  @property() activityName = "Add Activity";
  @property() activityLocation = "";
  @property() notes = "";


  override render() {
    return html`
      <div class="card-container">
        <span class="activity-text">${this.activityName}</span>
        <span class="activity-text">${this.activityLocation}</span>
        <span class="notes">${this.notes}</span>
      </div>
    `;
  }

  static styles = [
    reset.styles,
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
