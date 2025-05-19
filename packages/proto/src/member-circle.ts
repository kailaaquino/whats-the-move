import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

/* Used for members page only*/
export class MemberCircle extends LitElement {
  @property() initial = "";

  override render() {
    return html` <div class="circle">${this.initial}</div> `;
  }

  static styles = [
    reset.styles,
    css`
      .circle {
        display: flex;
        width: 62px;
        height: 62px;
        padding: 17px 23px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: var(--color-text-primary);
        color: var(--color-bg-dark);
        border-radius: 31px;
        background: var(--color-text-primary);
        font-family: var(--font-body);
      }
    `,
  ];
}
