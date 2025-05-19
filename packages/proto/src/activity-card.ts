import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class ActivityCard extends LitElement {
  @property() activity = "";


  override render() {
    return html`
     <text>hello</text>
    `;
  }

  static styles = [
    reset.styles,
    css`
      
    `,
  ];
}
