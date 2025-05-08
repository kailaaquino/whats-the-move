import{i as h,x as d,r as v,a as u,d as g,N as x}from"./nav-bar-DOiYJQBw.js";import{n as s}from"./property-BzsnG8ZR.js";document.body.addEventListener("theme:toggle",o=>{const r=o.detail.checked;document.body.classList.toggle("light-mode",r)});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(o){return s({...o,state:!0,attribute:!1})}var y=Object.defineProperty,n=(o,r,t,m)=>{for(var e=void 0,i=o.length-1,c;i>=0;i--)(c=o[i])&&(e=c(r,t,e)||e);return e&&y(r,t,e),e};const f=class f extends h{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return d`<div class="card-container">
        <a href=${this.href} class="card-colorbox">
        <div class="card-colorbox"></div>
      </a>

      <div class="card-text-container">
        <a href=${this.href} class="card-textLg">
          <div class="card-textLg">${this.groupName}</div>
        </a>
        <a href=${this.membersHref}>
          <div class="card-textSm">Members: ${this.members}</div>
        </a>
        <div class="card-textSm">Upcoming: ${this.upcoming}</div>
        <a href=${this.plansHref}>
          <div class="card-textXs">View plans</div>
        </a>
      </div>
    </div>`}};f.styles=[v.styles,u`
      .card-container {
        width: 300px; /* fixed width so 3 fit in one row */
        height: 300px; /* fixed height */
        background-color: var(--color-bg-nav);
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        flex-shrink: 0; /* prevent shrinking */
        overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .card-colorbox {
        width: 100%;
        height: 50%; /* half of the parent height */
        background-color: var(--color-accent-pink);
      }
      .card-text-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        width: 100%;
        height: 50%;
        padding: var(--space-xs);
        overflow: hidden;
      }

      .card-textLg {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        font-weight: bold;
        color: var(--color-text-primary);
      }
      .card-textMd {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        color: var(--color-text-primary);
      }
      .card-textSm {
        font-family: var(--font-body);
        font-size: var(--size-font-small);
        color: var(--color-text-primary);
      }

      .card-textXs {
        font-family: var(--font-body);
        font-size: var(--size-font-xs);
        color: var(--color-text-primary);
      }
    `];let a=f;n([s()],a.prototype,"groupName");n([s()],a.prototype,"members");n([s()],a.prototype,"upcoming");n([s()],a.prototype,"href");n([s({attribute:"plans-href"})],a.prototype,"plansHref");n([s({attribute:"members-href"})],a.prototype,"membersHref");var $=Object.defineProperty,p=(o,r,t,m)=>{for(var e=void 0,i=o.length-1,c;i>=0;i--)(c=o[i])&&(e=c(r,t,e)||e);return e&&$(r,t,e),e};class l extends h{constructor(){super(...arguments),this.groups=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(r){fetch(r).then(t=>{if(!t.ok)throw new Error(`Failed to load ${r}`);return t.json()}).then(t=>{this.groups=t}).catch(t=>{console.error(t)})}renderGroup(r){return d`
      <group-card
        groupName=${r.groupName}
        members=${r.members}
        upcoming=${r.upcoming}
        href=${r.href}
        plans-href=${r.plansHref}
        members-href=${r.membersHref}
      ></group-card>
    `}render(){return d`<section>${this.groups.map(this.renderGroup)}</section>`}}p([s()],l.prototype,"src");p([b()],l.prototype,"groups");g({"wtm-nav":x,"group-card":a,"wtm-group-list":l});
