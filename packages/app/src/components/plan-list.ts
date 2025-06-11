import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../styles/reset.css.ts";
import "../components/plan-card";

/* Wrapper for all the plans */
interface Plan {
  activity: string;
  location: string;
  date: string;
  going: string;
  notes: string;
}

export class PlanList extends LitElement {
  @property({ type: Array }) plans: Plan[] = [];

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
