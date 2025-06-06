import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";

/* Wrapper for all activities */
interface Availability {
  memberName: string;
  date: string;
}

export class AvailabilityList extends LitElement {
  @property() src?: string;
  @state() availabilities: Availability[] = [];

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
        this.availabilities = json as Availability[];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderActivity(availability: Availability) {
    return html`
      <availability-card
        memberName=${availability.memberName}
        date=${availability.date}
      ></availability-card>
    `;
  }
  render() {
    return html`
      <div class="card-col">
        ${this.availabilities.map((availability) => this.renderActivity(availability))}
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
