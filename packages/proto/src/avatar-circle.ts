import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class AvatarCircle extends LitElement {
  @property() initial = "";

  override render() {
    return html` <div class="circle">${this.initial}</div> `;
  }

  static styles = [
    reset.styles,
    css`
      .circle {
        display: flex;
        width: 31.209px;
        height: 31.209px;
        padding: 8.557px 11.578px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5.034px;
        border-radius: 15.605px;
        background: var(--color-text-primary);
        color: var(--color-bg-dark);
        font-family: var(--font-body);
      }
    `,
  ];
}
