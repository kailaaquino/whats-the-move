import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";

/* Wrapper for all activities */
interface Activity {
  activity: string;
  location: string;
  notes: string;
}

export class ActivityList extends LitElement {
  @property() src?: string;
  @state() activities: Activity[] = [];

  override connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  hydrate(src: string) {
    fetch(src)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${src}`);
        }
        return res.json();
      })
      .then((json: object) => {
        this.activities = json as Activity[];
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
