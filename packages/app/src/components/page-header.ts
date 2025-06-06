import { html, css, LitElement } from "lit";
import { reset } from "../../public/styles/reset.css.js";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

// Dynamic Page header
export class PageHeader extends LitElement {
  @property() type: "home" | "group" = "home";
  @property({ attribute: "group-name" }) groupName = "";

  @state() username?: string;

  _authObserver = new Observer<Auth.Model>(this, "wtm:auth");

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth) => {
      const user = auth.user;
      this.username = user?.authenticated ? user.username : undefined;
    });
  }

  render() {
    return html`
      <h1 class="page-header">
        ${this.type === "home"
          ? `Welcome back ${this.username}! What’s your next move?`
          : html`<a href="/app/group/${this.groupName}/plans"
              >${this.groupName}</a
            >`}
      </h1>
    `;
  }

  static styles = [
    reset,
    css`
      .page-header {
        font-family: var(--font-title);
        font-weight: bold;
        font-size: var(--size-font-xxl);
        color: var(--color-text-primary);
        display: block;
        width: 100%;
        line-height: 1.1;
        // padding: var(--space-xs) 0;
      }
      .page-header a {
        text-decoration: none;
        color: inherit;
      }

      .page-header a:visited {
        color: inherit;
      }
    `,
  ];
}
