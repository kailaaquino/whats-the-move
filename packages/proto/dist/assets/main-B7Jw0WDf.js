import{i as v,x as l,r as g,a as u,d as w,b as $}from"./reset.css-GlY_cqLy.js";import{N as k}from"./nav-bar-B3sAA9Ka.js";import{n as i}from"./property-BE6-Eo5M.js";import{r as z}from"./state-_RpdubKC.js";import{P as x}from"./page-header-CT2ts7P7.js";var H=Object.defineProperty,n=(o,r,t,y)=>{for(var e=void 0,s=o.length-1,c;s>=0;s--)(c=o[s])&&(e=c(r,t,e)||e);return e&&H(r,t,e),e};const f=class f extends v{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return l`<div class="card-container">
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
    </div>`}};f.styles=[g.styles,u`
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
    `];let a=f;n([i()],a.prototype,"groupName");n([i()],a.prototype,"members");n([i()],a.prototype,"upcoming");n([i()],a.prototype,"href");n([i({attribute:"plans-href"})],a.prototype,"plansHref");n([i({attribute:"members-href"})],a.prototype,"membersHref");var N=Object.defineProperty,b=(o,r,t,y)=>{for(var e=void 0,s=o.length-1,c;s>=0;s--)(c=o[s])&&(e=c(r,t,e)||e);return e&&N(r,t,e),e};const h=class h extends v{constructor(){super(...arguments),this.groups=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(r){fetch(r).then(t=>{if(!t.ok)throw new Error(`Failed to load ${r}`);return t.json()}).then(t=>{this.groups=t}).catch(t=>{console.error(t)})}renderGroup(r){return l`
      <group-card
        groupName=${r.groupName}
        members=${r.members}
        upcoming=${r.upcoming}
        href=${r.href}
        plans-href=${r.plansHref}
        members-href=${r.membersHref}
      ></group-card>
    `}render(){return l`<div class="card-row">
      ${this.groups.length>0?this.groups.map(this.renderGroup):l`<p class="empty-state">No groups to show yet.</p>`}
    </div>`}};h.styles=[g.styles,u`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let d=h;b([i()],d.prototype,"src");b([z()],d.prototype,"groups");w({"wtm-nav":k,"group-card":a,"wtm-group-list":d,"page-header":x,"mu-auth":$.Provider});var p,m;(m=(p=x).initializeOnce)==null||m.call(p);document.body.addEventListener("theme:toggle",o=>{const r=o.detail.checked;document.body.classList.toggle("light-mode",r)});
