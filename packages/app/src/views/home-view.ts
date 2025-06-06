import { html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  render() {
    console.log("Rendering home-view");
    return html`
      <page-header type="home"></page-header>
      <group-list src="/data/groups.json"></group-list>
    `;
  }
}
