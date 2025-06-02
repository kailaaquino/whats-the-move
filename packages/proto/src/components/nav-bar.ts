import { html, css, LitElement } from "lit";
import reset from "../styles/reset.css.ts";
import { Events } from "@calpoly/mustang";

export class NavBar extends LitElement {
  renderSignOutButton() {
    return html`
      <button
        class="signout-button"
        @click=${(e: Event) =>
          Events.relay(e, "auth:message", ["auth/signout"])}
      >
        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-signout" />
        </svg>
      </button>
    `;
  }
  override render() {
    return html`<nav class="nav-container">
      <div class="nav-contents">
        <h1><a href="/" class="title-logo">WTM</a></h1>
        <h2>
          <svg class="nav-icon">
            <use href="/icons/sprite.svg#icon-group" />
          </svg>
        </h2>

        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-add" />
        </svg>
        <h2>
          <a href="/friend-groups/side-questers/index.html">
            <span class="nav-text">SQ</span>
          </a>
        </h2>
        <h2>
          <a href="/friend-groups/roomies/index.html">
            <span class="nav-text">Roomies</span>
          </a>
        </h2>
        <label id="theme-toggle-label">
          <input
            type="checkbox"
            autocomplete="off"
            @change=${(event: Event) =>
              Events.relay(event, "theme:toggle", {
                checked: (event.target as HTMLInputElement).checked,
              })}
          />
          <span class="nav-text">Light mode</span>
        </label>

        ${this.renderSignOutButton()}
      </div>
    </nav>`;
  }

  static styles = [
    reset.styles,
    css`
      .title-logo {
        font-family: var(--font-logo);
        font-size: var(--size-font-xxl);
        color: var(--color-accent-yellow);
        text-decoration: none;
      }

      .nav-container {
        background-color: var(--color-bg-nav);
        margin: var(--space-sm);
        border-radius: var(--radius-sm);
        padding: var(--space-sm);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100vh;
      }

      .nav-contents {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        align-items: center;
        justify-content: center;
      }

      .nav-text {
        text-decoration: none;
        color: var(--color-text-primary);
      }

      .nav-icon {
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        color: var(--color-text-primary);
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      .signout-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
      .signout-button .nav-icon {
        width: 2em;
        height: 2em;
        fill: currentColor;
        color: var(--color-text-primary);
      }
    `,
  ];
}
