import{i as c,e as N,x as i,r as h,a as f,O as T,b as $,n,d as M,_ as V,h as W,c as G}from"./state-Dwv5TFWo.js";const z=class z extends c{renderSignOutButton(){return i`
      <button
        class="signout-button"
        @click=${e=>N.relay(e,"auth:message",["auth/signout"])}
      >
        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-signout" />
        </svg>
      </button>
    `}render(){return i`<nav class="nav-container">
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
          <a href="/app/group/side-questers/plans">
            <span class="nav-text">SQ</span>
          </a>
        </h2>
        <h2>
          <a href="/app/group/roomies/plans">
            <span class="nav-text">Roomies</span>
          </a>
        </h2>
        <h2>
          <a @click=${()=>location.assign("/login.html")}>Sign In</a>
        </h2>
        <label id="theme-toggle-label">
          <input
            type="checkbox"
            autocomplete="off"
            @change=${e=>N.relay(e,"theme:toggle",{checked:e.target.checked})}
          />
          <span class="nav-text">Light mode</span>
        </label>

        ${this.renderSignOutButton()}
      </div>
    </nav>`}};z.styles=[h,f`
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
    `];let w=z;var R=Object.defineProperty,k=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&R(e,r,t),t};const P=class P extends c{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new T(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const r=e.user;this.username=r!=null&&r.authenticated?r.username:void 0})}render(){return i`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:i`<a href="/app/group/${this.groupName}/plans"
              >${this.groupName}</a
            >`}
      </h1>
    `}};P.styles=[h,f`
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
    `];let v=P;k([n()],v.prototype,"type");k([n({attribute:"group-name"})],v.prototype,"groupName");k([$()],v.prototype,"username");var U=Object.defineProperty,E=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&U(e,r,t),t};const j=class j extends c{constructor(){super(...arguments),this.groups=[]}willUpdate(e){console.log("GroupList fetching from:",this.src),e.has("src")&&this.src&&this.hydrate(this.src)}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`Failed to load ${e}`);return r.json()}).then(r=>{this.groups=r}).catch(r=>{console.error(r)})}renderGroup(e){return i`
      <group-card
        groupName=${e.groupName}
        members=${e.members}
        upcoming=${e.upcoming}
        href=${e.href}
        plans-href=${e.plansHref}
        members-href=${e.membersHref}
      ></group-card>
    `}render(){return i`<div class="card-row">
      ${this.groups.length>0?this.groups.map(this.renderGroup):i`<p class="empty-state">No groups to show yet.</p>`}
    </div>`}};j.styles=[h,f`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let u=j;E([n()],u.prototype,"src");E([$()],u.prototype,"groups");var X=Object.defineProperty,g=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&X(e,r,t),t};const C=class C extends c{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return i`<div class="card-container">
        <a href=${this.href} class="card-colorbox">
        <div class="card-colorbox"></div>
      </a>

      <div class="card-text-container">
        <a href=${this.href}  class="card-textLg">
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
    </div>`}};C.styles=[h,f`
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
    `];let d=C;g([n()],d.prototype,"groupName");g([n()],d.prototype,"members");g([n()],d.prototype,"upcoming");g([n()],d.prototype,"href");g([n({attribute:"plans-href"})],d.prototype,"plansHref");g([n({attribute:"members-href"})],d.prototype,"membersHref");var q=Object.defineProperty,A=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&q(e,r,t),t};const O=class O extends c{constructor(){super(...arguments),this.activeTab="Plans",this.tabLinks=[{name:"Create",href:"create_plan.html"},{name:"Plans",href:"index.html"},{name:"Activities",href:"activities.html"},{name:"Availability",href:"availability.html"},{name:"Members",href:"members.html"}]}render(){return i`
      <nav class="friendbar">
        ${this.tabLinks.map(e=>i`
            <a
              class="friendbar-link ${this.activeTab===e.name?"active":""}"
              href="${e.href}"
            >
              ${e.name}
            </a>
          `)}
      </nav>
    `}};O.styles=[h,f`
      .friendbar {
        display: flex;
        gap: 2rem;
        align-self: stretch;
        justify-content: flex-start;
        margin: 16px
      }

      .friendbar-link {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        color: var(--color-text-primary);
        padding: var(--space-xs);
        border-radius: var(--radius-sm);
        text-decoration: none;
      }

      .friendbar-link.active {
        border: 1px solid var(--color-text-primary);
      }
    `];let x=O;A([n({type:String})],x.prototype,"activeTab");var B=Object.defineProperty,H=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&B(e,r,t),t};const S=class S extends c{constructor(){super(...arguments),this.plans=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`Failed to load ${e}`);return r.json()}).then(r=>{this.plans=r}).catch(r=>{console.error(r)})}renderPlan(e){return i`
      <plan-card
        activity=${e.activity}
        location=${e.location}
        date=${e.date}
        going=${e.going}
        notes=${e.notes}
      ></plan-card>
    `}render(){return i`
      <div class="card-row">
        ${this.plans.map(e=>this.renderPlan(e))}
      </div>
    `}};S.styles=[h,f`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let m=S;H([n()],m.prototype,"src");H([$()],m.prototype,"plans");var Q=Object.defineProperty,y=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&Q(e,r,t),t};const I=class I extends c{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(e=>e.trim()).filter(Boolean)}render(){return i`
      <div class="card-container">
        <span class="activity">${this.activity}</span>
        <span class="date">${this.date}</span>
        <div class="going">
          <span>Going:</span>
          <div class="avatar-list">
            ${this.goingList.map(e=>i`<avatar-circle .initial=${e}></avatar-circle>`)}
          </div>
        </div>
        <span class="notes"> Notes: ${this.notes}</span>
      </div>
    `}};I.styles=[h,f`
      .card-container {
        display: flex;
        width: 300px;
        height: 300px;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        background-color: var(--color-bg-nav);
        border-radius: 16px;
      }
      .activity {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        font-weight: bold;
        margin: 0;
      }
      .date {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        margin: 0;
      }
      .going {
        font-family: var(--font-body);
        font-size: var(--size-font-body);
        margin: 0;
      }
      .notes {
        font-family: var(--font-body);
        font-size: var(--size-font-sm);
        margin: 0;
        overflow: hidden;
      }
      .avatar-list {
        display: flex;
        align-items: center;
        gap: 8.054px;
      }
    `];let p=I;y([n()],p.prototype,"activity");y([n()],p.prototype,"location");y([n()],p.prototype,"date");y([n()],p.prototype,"going");y([n()],p.prototype,"notes");var F=Object.defineProperty,J=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&F(e,r,t),t};const L=class L extends c{constructor(){super(...arguments),this.initial=""}render(){return i` <div class="circle">${this.initial}</div> `}};L.styles=[h,f`
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
    `];let b=L;J([n()],b.prototype,"initial");class K extends c{render(){return console.log("Rendering home-view"),i`
      <page-header type="home"></page-header>
      <group-list src="/data/groups.json"></group-list>
    `}}var Y=Object.defineProperty,D=(s,e,r,l)=>{for(var t=void 0,a=s.length-1,o;a>=0;a--)(o=s[a])&&(t=o(e,r,t)||t);return t&&Y(e,r,t),t};class _ extends c{constructor(){super(...arguments),this.groupId=""}connectedCallback(){super.connectedCallback(),this.loadGroupData()}async loadGroupData(){try{const r=await(await fetch("/data/groups.json")).json();this.groupData=r.find(l=>l.groupId===this.groupId)}catch(e){console.error("Error loading group data",e)}}render(){return this.groupData?i`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupData.groupName}
          ></page-header>
          <friend-nav activeTab="Plans"></friend-nav>
        </div>
        <plan-list src="/data/plans-${this.groupId}.json"></plan-list>
      </div>
    `:i`<p>Loading group info...</p>`}}D([n({attribute:"group-id"})],_.prototype,"groupId");D([$()],_.prototype,"groupData");const Z=[{path:"/app",view:()=>i`<home-view></home-view>`},{path:"/app/group/:groupId/plans",view:s=>i`<plans-view group-id=${s.groupId}></plans-view>`},{path:"/",redirect:"/app"}];M({"wtm-nav":w,"page-header":v,"mu-auth":G.Provider,"mu-history":W.Provider,"mu-switch":class extends V.Element{constructor(){super(Z,"wtm:history","wtm:auth")}},"home-view":K,"plans-view":_,"group-list":u,"group-card":d,"friend-nav":x,"plan-list":m,"plan-card":p,"avatar-circle":b});document.body.addEventListener("theme:toggle",s=>{const e=s.detail.checked;document.body.classList.toggle("light-mode",e)});
