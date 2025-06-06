import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";

/* Individual plan card component */
export class PlanCard extends LitElement {
  @property() activity = "";
  @property() location = "";
  @property() date = "";
  @property() going = "";
  @property() notes = "";
  get goingList() {
    return this.going
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  override render() {
    return html`
      <div class="card-container">
        <span class="activity">${this.activity}</span>
        <span class="date">${this.date}</span>
        <div class="going">
          <span>Going:</span>
          <div class="avatar-list">
            ${this.goingList.map(
              (initial) =>
                html`<avatar-circle .initial=${initial}></avatar-circle>`
            )}
          </div>
        </div>
        <span class="notes"> Notes: ${this.notes}</span>
      </div>
    `;
  }

  static styles = [
    reset,
    css`
      .card-container {
        display: flex;
        width: 300px;
        height: 300px;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        background-color: var(--color-bg-nav);
        border-radius: 16px;
      }
      .activity {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        font-weight: bold;
        margin: 0;
      }
      .date {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        margin: 0;
      }
      .going {
        font-family: var(--font-body);
        font-size: var(--size-font-body);
        margin: 0;
      }
      .notes {
        font-family: var(--font-body);
        font-size: var(--size-font-sm);
        margin: 0;
        overflow: hidden;
      }
      .avatar-list {
        display: flex;
        align-items: center;
        gap: 8.054px;
      }
    `,
  ];
}
