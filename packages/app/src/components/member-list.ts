import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { reset } from "../../public/styles/reset.css.js";

/* Wrapper for all members */
interface Member {
  firstName: string;
  lastName: string;
}

export class MemberList extends LitElement {
  @property() src?: string;
  @state() members: Member[] = [];

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
        this.members = json as Member[];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderActivity(member: Member) {
    return html`
      <member-card
        firstName=${member.firstName}
        lastName=${member.lastName}
      ></member-card>
    `;
  }
  render() {
    return html`
      <div class="card-row">
        ${this.members.map((member) => this.renderActivity(member))}
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
