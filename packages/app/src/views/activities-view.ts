import { html } from "lit";
import { property } from "lit/decorators.js";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { Activity } from "server/models";

export class ActivitiesViewElement extends View<Model, Msg> {
  @property({ attribute: "group-id" })
  groupId = "";

  constructor() {
    super("wtm:model"); 
  }

  get activities(): Activity[] | undefined {
    return this.model.activities;
  }
  

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "group-id" && newVal) {
      this.dispatchMessage(["activity/select", { activityId: newVal }]);
    }
  }

  render() {
    if (!this.activities) {
      return html`<p>Loading activity data...</p>`;
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
            activeTab="Activities"
          ></friend-nav>
        </div>

        <main>
          <section class="activities">
<activity-list .activities=${this.activities}></activity-list>
          </section>
        </main>
      </div>
    `;
  }
}
