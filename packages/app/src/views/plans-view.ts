import { html } from "lit";
import { property } from "lit/decorators.js";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { Plans } from "server/models";

export class PlansViewElement extends View<Model, Msg> {
  @property({ attribute: "group-id" })
  groupId?: string;

  constructor() {
    super("wtm:model");
  }

  get plans(): Plans[] | undefined {
    return this.model.plans;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "group-id" && newValue) {
      this.dispatchMessage(["plan/select", { planid: newValue }]);
    }
  }

  render() {
    if (!this.plans) {
      return html`<p>Loading plan info...</p>`;
    }

    return html`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupId}
          ></page-header>
          <friend-nav
            group-id=${this.groupId}
            activeTab="Plans"
          ></friend-nav>
        </div>
        <plan-list .plans=${this.plans}></plan-list>
      </div>
    `;
  }
}
