import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class FriendNav extends LitElement {
  @property({ type: String }) activeTab = "Plans";

  tabs = ["Create", "Plans", "Activities", "Availabilities", "Members"];

  override render() {
    return html`
      <nav class="friendbar">
        ${this.tabs.map(
          (tab) => html`
            <a
              class="friendbar-link ${this.activeTab === tab ? "active" : ""}"
              href="${tab.toLowerCase()}"
            >
              ${tab}
            </a>
          `
        )}
      </nav>
    `;
  }

  static styles = [
    reset.styles,
    css`
      .friendbar {
        display: flex;
        gap: 2rem;
        align-self: stretch;
        justify-content: flex-start;
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
        border: var(--color-text-primary);
      }
    `,
  ];
}
