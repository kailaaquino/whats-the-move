import{i as p,x as l,r as m,a as v,n as i,d as x,N as y}from"./property-CrkbdDop.js";import{r as b}from"./state-DMDvs1Jn.js";document.body.addEventListener("theme:toggle",s=>{const r=s.detail.checked;document.body.classList.toggle("light-mode",r)});var w=Object.defineProperty,n=(s,r,t,u)=>{for(var e=void 0,a=s.length-1,c;a>=0;a--)(c=s[a])&&(e=c(r,t,e)||e);return e&&w(r,t,e),e};const f=class f extends p{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return l`<div class="card-container">
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
    </div>`}};f.styles=[m.styles,v`
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
    `];let o=f;n([i()],o.prototype,"groupName");n([i()],o.prototype,"members");n([i()],o.prototype,"upcoming");n([i()],o.prototype,"href");n([i({attribute:"plans-href"})],o.prototype,"plansHref");n([i({attribute:"members-href"})],o.prototype,"membersHref");var $=Object.defineProperty,g=(s,r,t,u)=>{for(var e=void 0,a=s.length-1,c;a>=0;a--)(c=s[a])&&(e=c(r,t,e)||e);return e&&$(r,t,e),e};const h=class h extends p{constructor(){super(...arguments),this.groups=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(r){fetch(r).then(t=>{if(!t.ok)throw new Error(`Failed to load ${r}`);return t.json()}).then(t=>{this.groups=t}).catch(t=>{console.error(t)})}renderGroup(r){return l`
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
    </div>`}};h.styles=[m.styles,v`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let d=h;g([i()],d.prototype,"src");g([b()],d.prototype,"groups");x({"wtm-nav":y,"group-card":o,"wtm-group-list":d});
