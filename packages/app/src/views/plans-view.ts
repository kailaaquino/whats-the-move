import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface GroupData {
  groupId: string;
  groupName: string;
  members: string;
  upcoming: string;
  plansHref: string;
  membersHref: string;
}

export class PlansViewElement extends LitElement {
  @property({ attribute: "group-id" })
  groupId: string = "";

  @state()
  groupData?: GroupData;

  connectedCallback() {
    super.connectedCallback();
    this.loadGroupData();
  }

  async loadGroupData() {
    try {
      const res = await fetch("/data/groups.json");
      const groups: GroupData[] = await res.json();
      this.groupData = groups.find((g) => g.groupId === this.groupId);
    } catch (err) {
      console.error("Error loading group data", err);
    }
  }

  render() {
    if (!this.groupData) {
      return html`<p>Loading group info...</p>`;
    }

    return html`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupData.groupName}
          ></page-header>
          <friend-nav activeTab="Plans"></friend-nav>
        </div>
        <plan-list src="/data/plans-${this.groupId}.json"></plan-list>
      </div>
    `;
  }
}
