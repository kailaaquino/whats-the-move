import { html } from "lit";
import { property } from "lit/decorators.js";
import { View, define, Form} from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { Activity } from "server/models";


export class ActivitiesViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });
  @property({ attribute: "group-id" })
  groupId = "";

  constructor() {
    super("wtm:model");
  }

  get activity(): Activity | undefined {
    return this.model.activity;
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "group-id" && newVal) {
      this.dispatchMessage(["activity/select", { activityId: "684a08c64a2bdb006df8951b" }]);
    }
  }

  render() {
    if (!this.activity) {
      return html`<p>Loading activity data...</p>`;
    }

    return html`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header type="group" group-name=${this.groupId}></page-header>

          <friend-nav
            group-id=${this.groupId}
            activeTab="Activities"
          ></friend-nav>
        </div>

        <main>
          <section class="activities">
            <activity-card
              activity=${this.activity.activityName}
              location=${this.activity.location}
              notes=${this.activity.notes}
            ></activity-card>
          </section>
        </main>
      </div>
    `;
  }
}
