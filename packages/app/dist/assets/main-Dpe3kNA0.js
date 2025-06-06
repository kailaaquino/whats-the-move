import{i as l,e as M,x as o,r as p,a as d,O as q,b as g,n,d as B,_ as F,h as Q,c as J}from"./state-Dwv5TFWo.js";const C=class C extends l{renderSignOutButton(){return o`
      <button
        class="signout-button"
        @click=${t=>M.relay(t,"auth:message",["auth/signout"])}
      >
        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-signout" />
        </svg>
      </button>
    `}render(){return o`<nav class="nav-container">
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
            @change=${t=>M.relay(t,"theme:toggle",{checked:t.target.checked})}
          />
          <span class="nav-text">Light mode</span>
        </label>

        ${this.renderSignOutButton()}
      </div>
    </nav>`}};C.styles=[p,d`
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
    `];let _=C;var K=Object.defineProperty,P=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&K(t,r,e),e};const O=class O extends l{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new q(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const r=t.user;this.username=r!=null&&r.authenticated?r.username:void 0})}render(){return o`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:o`<a href="/app/group/${this.groupName}/plans"
              >${this.groupName}</a
            >`}
      </h1>
    `}};O.styles=[p,d`
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
    `];let u=O;P([n()],u.prototype,"type");P([n({attribute:"group-name"})],u.prototype,"groupName");P([g()],u.prototype,"username");var Y=Object.defineProperty,G=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&Y(t,r,e),e};const D=class D extends l{constructor(){super(...arguments),this.groups=[]}willUpdate(t){console.log("GroupList fetching from:",this.src),t.has("src")&&this.src&&this.hydrate(this.src)}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(r=>{if(!r.ok)throw new Error(`Failed to load ${t}`);return r.json()}).then(r=>{this.groups=r}).catch(r=>{console.error(r)})}renderGroup(t){return o`
      <group-card
        groupName=${t.groupName}
        members=${t.members}
        upcoming=${t.upcoming}
        href=${t.href}
        plans-href=${t.plansHref}
        members-href=${t.membersHref}
      ></group-card>
    `}render(){return o`<div class="card-row">
      ${this.groups.length>0?this.groups.map(this.renderGroup):o`<p class="empty-state">No groups to show yet.</p>`}
    </div>`}};D.styles=[p,d`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let y=D;G([n()],y.prototype,"src");G([g()],y.prototype,"groups");var Z=Object.defineProperty,m=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&Z(t,r,e),e};const S=class S extends l{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return o`<div class="card-container">
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
    </div>`}};S.styles=[p,d`
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
    `];let h=S;m([n()],h.prototype,"groupName");m([n()],h.prototype,"members");m([n()],h.prototype,"upcoming");m([n()],h.prototype,"href");m([n({attribute:"plans-href"})],h.prototype,"plansHref");m([n({attribute:"members-href"})],h.prototype,"membersHref");var tt=Object.defineProperty,V=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&tt(t,r,e),e};const E=class E extends l{constructor(){super(...arguments),this.activeTab="Plans",this.groupId="",this.tabLinks=[{name:"Create",path:"create"},{name:"Plans",path:"plans"},{name:"Activities",path:"activities"},{name:"Availabilities",path:"Availabilities"},{name:"Members",path:"Members"}]}handleSpaNavigate(t){t.preventDefault();const c=t.currentTarget.getAttribute("href");c&&(history.pushState(null,"",c),window.dispatchEvent(new PopStateEvent("popstate")))}render(){return o`
      <nav class="friendbar">
        ${this.tabLinks.map(t=>{const r=`/app/group/${this.groupId}/${t.path}`;return o`
            <a
              class="friendbar-link ${this.activeTab===t.name?"active":""}"
              href="${r}"
              @click=${this.handleSpaNavigate}
            >
              ${t.name}
            </a>
          `})}
      </nav>
    `}};E.styles=[p,d`
      .friendbar {
        display: flex;
        gap: 2rem;
        align-self: stretch;
        justify-content: flex-start;
        margin: 16px;
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
    `];let x=E;V([n({type:String})],x.prototype,"activeTab");V([n({attribute:"group-id"})],x.prototype,"groupId");var et=Object.defineProperty,W=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&et(t,r,e),e};const N=class N extends l{constructor(){super(...arguments),this.plans=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(r=>{if(!r.ok)throw new Error(`Failed to load ${t}`);return r.json()}).then(r=>{this.plans=r}).catch(r=>{console.error(r)})}renderPlan(t){return o`
      <plan-card
        activity=${t.activity}
        location=${t.location}
        date=${t.date}
        going=${t.going}
        notes=${t.notes}
      ></plan-card>
    `}render(){return o`
      <div class="card-row">
        ${this.plans.map(t=>this.renderPlan(t))}
      </div>
    `}};N.styles=[p,d`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let b=N;W([n()],b.prototype,"src");W([g()],b.prototype,"plans");var rt=Object.defineProperty,w=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&rt(t,r,e),e};const H=class H extends l{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(t=>t.trim()).filter(Boolean)}render(){return o`
      <div class="card-container">
        <span class="activity">${this.activity}</span>
        <span class="date">${this.date}</span>
        <div class="going">
          <span>Going:</span>
          <div class="avatar-list">
            ${this.goingList.map(t=>o`<avatar-circle .initial=${t}></avatar-circle>`)}
          </div>
        </div>
        <span class="notes"> Notes: ${this.notes}</span>
      </div>
    `}};H.styles=[p,d`
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
    `];let v=H;w([n()],v.prototype,"activity");w([n()],v.prototype,"location");w([n()],v.prototype,"date");w([n()],v.prototype,"going");w([n()],v.prototype,"notes");var at=Object.defineProperty,it=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&at(t,r,e),e};const L=class L extends l{constructor(){super(...arguments),this.initial=""}render(){return o` <div class="circle">${this.initial}</div> `}};L.styles=[p,d`
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
    `];let k=L;it([n()],k.prototype,"initial");var st=Object.defineProperty,j=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&st(t,r,e),e};const T=class T extends l{constructor(){super(...arguments),this.activity="Add Activity",this.location="",this.notes=""}render(){return o`
      <div class="card-container">
        <span class="activity-text">${this.activity}</span>
        <span class="activity-text">${this.location}</span>
        <span class="notes">${this.notes}</span>
      </div>
    `}};T.styles=[p,d`
      .card-container {
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .activity-text {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .notes {
        color: #fff;
        font-family: var(--font-body);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    `];let f=T;j([n()],f.prototype,"activity");j([n()],f.prototype,"location");j([n()],f.prototype,"notes");var ot=Object.defineProperty,R=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&ot(t,r,e),e};const A=class A extends l{constructor(){super(...arguments),this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(r=>{if(!r.ok)throw new Error(`Failed to load ${t}`);return r.json()}).then(r=>{this.activities=r}).catch(r=>{console.error(r)})}renderActivity(t){return o`
      <activity-card
        activity=${t.activity}
        location=${t.location}
        notes=${t.notes}
      ></activity-card>
    `}render(){return o`
      <div class="card-col">
        ${this.activities.map(t=>this.renderActivity(t))}
      </div>
    `}};A.styles=[p,d`
      .card-col {
      display: flex;
      flex-direction: column;
      gap: 32px;

      }
    `];let $=A;R([n()],$.prototype,"src");R([g()],$.prototype,"activities");class nt extends l{render(){return console.log("Rendering home-view"),o`
      <page-header type="home"></page-header>
      <group-list src="/data/groups.json"></group-list>
    `}}var ct=Object.defineProperty,U=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&ct(t,r,e),e};class z extends l{constructor(){super(...arguments),this.groupId=""}connectedCallback(){super.connectedCallback(),this.loadGroupData()}async loadGroupData(){try{const r=await(await fetch("/data/groups.json")).json();this.groupData=r.find(c=>c.groupId===this.groupId)}catch(t){console.error("Error loading group data",t)}}render(){return this.groupData?o`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupData.groupName}
          ></page-header>
<friend-nav
            group-id=${this.groupId}
            activeTab="Plans"
          ></friend-nav>        </div>
        <plan-list src="/data/plans-${this.groupId}.json"></plan-list>
      </div>
    `:o`<p>Loading group info...</p>`}}U([n({attribute:"group-id"})],z.prototype,"groupId");U([g()],z.prototype,"groupData");var lt=Object.defineProperty,X=(i,t,r,c)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&lt(t,r,e),e};class I extends l{constructor(){super(...arguments),this.groupId=""}connectedCallback(){super.connectedCallback(),this.loadGroupData()}async loadGroupData(){try{const r=await(await fetch("/data/groups.json")).json();this.groupData=r.find(c=>c.groupId===this.groupId)}catch(t){console.error("Error loading group data",t)}}render(){return this.groupData?o`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupData.groupName}
          ></page-header>
          <friend-nav
            group-id=${this.groupId}
            activeTab="Activities"
          ></friend-nav>
        </div>

        <main>
          <section class="activities">
            <activity-list
              src="/data/activities-${this.groupId}.json"
            ></activity-list>
          </section>
        </main>
      </div>
    `:o`<p>Loading group info...</p>`}}X([n({attribute:"group-id"})],I.prototype,"groupId");X([g()],I.prototype,"groupData");const pt=[{path:"/app",view:()=>o`<home-view></home-view>`},{path:"/app/group/:groupId/plans",view:i=>o`<plans-view group-id=${i.groupId}></plans-view>`},{path:"/app/group/:groupId/activities",view:i=>o`<activities-view group-id=${i.groupId}></activities-view> `},{path:"/",redirect:"/app"}];B({"wtm-nav":_,"page-header":u,"mu-auth":J.Provider,"mu-history":Q.Provider,"mu-switch":class extends F.Element{constructor(){super(pt,"wtm:history","wtm:auth")}},"home-view":nt,"plans-view":z,"activities-view":I,"group-list":y,"group-card":h,"activity-list":$,"activity-card":f,"friend-nav":x,"plan-list":b,"plan-card":v,"avatar-circle":k});document.body.addEventListener("theme:toggle",i=>{const t=i.detail.checked;document.body.classList.toggle("light-mode",t)});
