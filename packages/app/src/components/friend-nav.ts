import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../../public/styles/reset.css.js";

export class FriendNav extends LitElement {
  @property({ type: String }) activeTab = "Plans";
  @property({ attribute: "group-id" }) groupId = "";

  tabLinks = [
    { name: "Create", path: "create" },
    { name: "Plans", path: "plans" },
    { name: "Activities", path: "activities" },
    { name: "Availabilities", path: "Availabilities" },
    { name: "Members", path: "Members" },


  ];
  handleSpaNavigate(event: MouseEvent) {
    event.preventDefault();
    const anchor = event.currentTarget as HTMLAnchorElement;
    const href = anchor.getAttribute("href");
    if (href) {
      history.pushState(null, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }
  override render() {
    return html`
      <nav class="friendbar">
        ${this.tabLinks.map((tab) => {
          const href = `/app/group/${this.groupId}/${tab.path}`;
          return html`
            <a
              class="friendbar-link ${this.activeTab === tab.name
                ? "active"
                : ""}"
              href="${href}"
              @click=${this.handleSpaNavigate}
            >
              ${tab.name}
            </a>
          `;
        })}
      </nav>
    `;
  }

  static styles = [
    reset,
    css`
      .friendbar {
        display: flex;
        gap: 2rem;
        align-self: stretch;
        justify-content: flex-start;
        margin: 16px;
      }

      .friendbar-link {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        color: var(--color-text-primary);
        padding: var(--space-xs);
        border-radius: var(--radius-sm);
        text-decoration: none;
      }

      .friendbar-link.active {
        border: 1px solid var(--color-text-primary);
      }
    `,
  ];
}
