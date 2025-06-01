import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";

interface Group {
  groupName: string;
  members: string;
  upcoming: string;
  href: string;
  plansHref: string;
  membersHref: string;
}

export class GroupList extends LitElement {
  @property() src?: string;
  @state() groups: Group[] = [];

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
        this.groups = json as Group[];
      })
      .catch((err) => {
        console.error(err);
      });
  }
  renderGroup(group: Group) {
    return html`
      <group-card
        groupName=${group.groupName}
        members=${group.members}
        upcoming=${group.upcoming}
        href=${group.href}
        plans-href=${group.plansHref}
        members-href=${group.membersHref}
      ></group-card>
    `;
  }

  render() {
    return html`<div class="card-row">
      ${this.groups.length > 0
        ? this.groups.map(this.renderGroup)
        : html`<p class="empty-state">No groups to show yet.</p>`}
    </div>`;
  }

  static styles = [
    reset.styles,
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
