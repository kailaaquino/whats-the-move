import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { reset } from "../../public/styles/reset.css.js";

export class FriendNav extends LitElement {
  @property({ type: String }) activeTab = "Plans";

  tabLinks = [
    { name: "Create", href: "create_plan.html" },
    { name: "Plans", href: "index.html" },
    { name: "Activities", href: "activities.html" },
    { name: "Availability", href: "availability.html" },
    { name: "Members", href: "members.html" },
  ];
  override render() {
    return html`
      <nav class="friendbar">
        ${this.tabLinks.map(
          (tab) => html`
            <a
              class="friendbar-link ${this.activeTab === tab.name
                ? "active"
                : ""}"
              href="${tab.href}"
            >
              ${tab.name}
            </a>
          `
        )}
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
        margin: 16px
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
