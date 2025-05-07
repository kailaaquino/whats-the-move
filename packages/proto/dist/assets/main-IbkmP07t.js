import{i as l,x as f,r as h,a as m,d as p,N as v}from"./nav-bar-DOiYJQBw.js";import{n as t}from"./property-BzsnG8ZR.js";document.body.addEventListener("theme:toggle",a=>{const i=a.detail.checked;document.body.classList.toggle("light-mode",i)});var x=Object.defineProperty,o=(a,i,c,g)=>{for(var r=void 0,s=a.length-1,n;s>=0;s--)(n=a[s])&&(r=n(i,c,r)||r);return r&&x(i,c,r),r};const d=class d extends l{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return f`<div class="card-container">
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
    </div>`}};d.styles=[h.styles,m`
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
    `];let e=d;o([t()],e.prototype,"groupName");o([t()],e.prototype,"members");o([t()],e.prototype,"upcoming");o([t()],e.prototype,"href");o([t({attribute:"plans-href"})],e.prototype,"plansHref");o([t({attribute:"members-href"})],e.prototype,"membersHref");p({"wtm-nav":v,"group-card":e});
