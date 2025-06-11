import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../styles/reset.css.ts";

/* Wrapper for all activities */
interface Activity {
  activity: string;
  location: string;
  notes: string;
}

export class ActivityList extends LitElement {
  @property({ type: Array }) activities: Activity[] = [];

  renderActivity(activity: Activity) {
    return html`
      <activity-card
        activity=${activity.activity}
        location=${activity.location}
        notes=${activity.notes}
      ></activity-card>
    `;
  }

  render() {
    return html`
      <div class="card-col">
        ${this.activities.map((activity) => this.renderActivity(activity))}
      </div>
    `;
  }

  static styles = [
    reset,
    css`
      .card-col {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
    `,
  ];
}
