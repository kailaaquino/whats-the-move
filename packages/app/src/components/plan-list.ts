import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { reset } from "../../public/styles/reset.css.js";

/* Wrapper for all the plans */
interface Plan {
  activity: string;
  location: string;
  date: string;
  going: string;
  notes: string;
}

export class PlanList extends LitElement {
  @property() src?: string;
  @state() plans: Plan[] = [];

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
        this.plans = json as Plan[];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderPlan(plan: Plan) {
    return html`
      <plan-card
        activity=${plan.activity}
        location=${plan.location}
        date=${plan.date}
        going=${plan.going}
        notes=${plan.notes}
      ></plan-card>
    `;
  }
  render() {
    return html`
      <div class="card-row">
        ${this.plans.map((plan) => this.renderPlan(plan))}
      </div>
    `;
  }
  static styles = [
    reset,
    css`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `,
  ];
}
