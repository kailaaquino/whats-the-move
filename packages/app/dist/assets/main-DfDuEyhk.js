import{a as P,i as l,e as T,x as n,r as u,b as d,O as B,c as U,n as c,V as W,d as D,s as Q,_ as G,h as J}from"./state-BkmdFmxF.js";const K={};function Y(a,t,r){switch(a[0]){case"plan/select":Z(a[1],r).then(o=>t(e=>({...e,plans:o})));break;case"activity/select":F(a[1],r).then(o=>t(e=>({...e,activities:o})));break;default:throw new Error(`Unhandled message: "${a[0]}"`)}}function Z(a,t){return fetch(`/data/plans-${a.planid}.json`,{headers:P.headers(t)}).then(r=>{if(r.status===200)return r.json()}).then(r=>{if(r)return console.log("Plan:",r),r})}function F(a,t){return fetch(`/data/activities-${a.activityId}.json`,{headers:P.headers(t)}).then(r=>{if(r.status===200)return r.json()}).then(r=>{if(r)return console.log("Activities:",r),r})}const I=class I extends l{renderSignOutButton(){return n`
      <button
        class="signout-button"
        @click=${t=>T.relay(t,"auth:message",["auth/signout"])}
      >
        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-signout" />
        </svg>
      </button>
    `}render(){return n`<nav class="nav-container">
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
            @change=${t=>T.relay(t,"theme:toggle",{checked:t.target.checked})}
          />
          <span class="nav-text">Light mode</span>
        </label>

        ${this.renderSignOutButton()}
      </div>
    </nav>`}};I.styles=[u,d`
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
    `];let _=I;var tt=Object.defineProperty,z=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&tt(t,r,e),e};const O=class O extends l{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new B(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const r=t.user;this.username=r!=null&&r.authenticated?r.username:void 0})}render(){return n`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:n`<a href="/app/group/${this.groupName}/plans"
              >${this.groupName}</a
            >`}
      </h1>
    `}};O.styles=[u,d`
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
    `];let f=O;z([c()],f.prototype,"type");z([c({attribute:"group-name"})],f.prototype,"groupName");z([U()],f.prototype,"username");var et=Object.defineProperty,R=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&et(t,r,e),e};const j=class j extends l{constructor(){super(...arguments),this.groups=[]}willUpdate(t){console.log("GroupList fetching from:",this.src),t.has("src")&&this.src&&this.hydrate(this.src)}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(r=>{if(!r.ok)throw new Error(`Failed to load ${t}`);return r.json()}).then(r=>{this.groups=r}).catch(r=>{console.error(r)})}renderGroup(t){return n`
      <group-card
        groupName=${t.groupName}
        members=${t.members}
        upcoming=${t.upcoming}
        href=${t.href}
        plans-href=${t.plansHref}
        members-href=${t.membersHref}
      ></group-card>
    `}render(){return n`<div class="card-row">
      ${this.groups.length>0?this.groups.map(this.renderGroup):n`<p class="empty-state">No groups to show yet.</p>`}
    </div>`}};j.styles=[u,d`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let m=j;R([c()],m.prototype,"src");R([U()],m.prototype,"groups");var rt=Object.defineProperty,g=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&rt(t,r,e),e};const S=class S extends l{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return n`<div class="card-container">
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
    </div>`}};S.styles=[u,d`
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
    `];let p=S;g([c()],p.prototype,"groupName");g([c()],p.prototype,"members");g([c()],p.prototype,"upcoming");g([c()],p.prototype,"href");g([c({attribute:"plans-href"})],p.prototype,"plansHref");g([c({attribute:"members-href"})],p.prototype,"membersHref");var at=Object.defineProperty,V=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&at(t,r,e),e};const E=class E extends l{constructor(){super(...arguments),this.activeTab="Plans",this.groupId="",this.tabLinks=[{name:"Create",path:"create"},{name:"Plans",path:"plans"},{name:"Activities",path:"activities"},{name:"Availabilities",path:"Availabilities"},{name:"Members",path:"Members"}]}handleSpaNavigate(t){t.preventDefault();const o=t.currentTarget.getAttribute("href");o&&(history.pushState(null,"",o),window.dispatchEvent(new PopStateEvent("popstate")))}render(){return n`
      <nav class="friendbar">
        ${this.tabLinks.map(t=>{const r=`/app/group/${this.groupId}/${t.path}`;return n`
            <a
              class="friendbar-link ${this.activeTab===t.name?"active":""}"
              href="${r}"
              @click=${this.handleSpaNavigate}
            >
              ${t.name}
            </a>
          `})}
      </nav>
    `}};E.styles=[u,d`
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
    `];let y=E;V([c({type:String})],y.prototype,"activeTab");V([c({attribute:"group-id"})],y.prototype,"groupId");const k=d`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`;var it=Object.defineProperty,x=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&it(t,r,e),e};const A=class A extends l{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(t=>t.trim()).filter(Boolean)}render(){return n`
      <div class="card-container">
        <span class="activity">${this.activity}</span>
        <span class="date">${this.date}</span>
        <div class="going">
          <span>Going:</span>
          <div class="avatar-list">
            ${this.goingList.map(t=>n`<avatar-circle .initial=${t}></avatar-circle>`)}
          </div>
        </div>
        <span class="notes"> Notes: ${this.notes}</span>
      </div>
    `}};A.styles=[k,d`
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
    `];let h=A;x([c()],h.prototype,"activity");x([c()],h.prototype,"location");x([c()],h.prototype,"date");x([c()],h.prototype,"going");x([c()],h.prototype,"notes");customElements.define("plan-card",h);var st=Object.defineProperty,nt=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&st(t,r,e),e};const N=class N extends l{constructor(){super(...arguments),this.plans=[]}renderPlan(t){return n`
      <plan-card
        activity=${t.activity}
        location=${t.location}
        date=${t.date}
        going=${t.going}
        notes=${t.notes}
      ></plan-card>
    `}render(){return n`
      <div class="card-row">
        ${this.plans.map(t=>this.renderPlan(t))}
      </div>
    `}};N.styles=[k,d`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let b=N;nt([c({type:Array})],b.prototype,"plans");var ot=Object.defineProperty,ct=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&ot(t,r,e),e};const H=class H extends l{constructor(){super(...arguments),this.initial=""}render(){return n` <div class="circle">${this.initial}</div> `}};H.styles=[u,d`
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
    `];let $=H;ct([c()],$.prototype,"initial");var lt=Object.defineProperty,C=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&lt(t,r,e),e};const L=class L extends l{constructor(){super(...arguments),this.activity="Add Activity",this.location="",this.notes=""}render(){return n`
      <div class="card-container">
        <span class="activity-text">${this.activity}</span>
        <span class="activity-text">${this.location}</span>
        <span class="notes">${this.notes}</span>
      </div>
    `}};L.styles=[k,d`
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
    `];let v=L;C([c()],v.prototype,"activity");C([c()],v.prototype,"location");C([c()],v.prototype,"notes");customElements.define("activity-card",v);var dt=Object.defineProperty,pt=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&dt(t,r,e),e};const M=class M extends l{constructor(){super(...arguments),this.activities=[]}renderActivity(t){return n`
      <activity-card
        activity=${t.activity}
        location=${t.location}
        notes=${t.notes}
      ></activity-card>
    `}render(){return n`
      <div class="card-col">
        ${this.activities.map(t=>this.renderActivity(t))}
      </div>
    `}};M.styles=[k,d`
      .card-col {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
    `];let w=M;pt([c({type:Array})],w.prototype,"activities");class ht extends l{render(){return console.log("Rendering home-view"),n`
      <page-header type="home"></page-header>
      <group-list src="/data/groups.json"></group-list>
    `}}var vt=Object.defineProperty,ft=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&vt(t,r,e),e};class X extends W{constructor(){super("wtm:model")}get plans(){return this.model.plans}attributeChangedCallback(t,r,o){super.attributeChangedCallback(t,r,o),t==="group-id"&&o&&this.dispatchMessage(["plan/select",{planid:o}])}render(){return this.plans?n`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupId}
          ></page-header>
          <friend-nav
            group-id=${this.groupId}
            activeTab="Plans"
          ></friend-nav>
        </div>
        <plan-list .plans=${this.plans}></plan-list>
      </div>
    `:n`<p>Loading plan info...</p>`}}ft([c({attribute:"group-id"})],X.prototype,"groupId");var ut=Object.defineProperty,gt=(a,t,r,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(t,r,e)||e);return e&&ut(t,r,e),e};class q extends W{constructor(){super("wtm:model"),this.groupId=""}get activities(){return this.model.activities}attributeChangedCallback(t,r,o){super.attributeChangedCallback(t,r,o),t==="group-id"&&o&&this.dispatchMessage(["activity/select",{activityId:o}])}render(){return this.activities?n`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupId}
          ></page-header>

          <friend-nav
            group-id=${this.groupId}
            activeTab="Activities"
          ></friend-nav>
        </div>

        <main>
          <section class="activities">
<activity-list .activities=${this.activities}></activity-list>
          </section>
        </main>
      </div>
    `:n`<p>Loading activity data...</p>`}}gt([c({attribute:"group-id"})],q.prototype,"groupId");const mt=[{path:"/app",view:()=>n`<home-view></home-view>`},{path:"/app/group/:groupId/plans",view:a=>n`<plans-view group-id=${a.groupId}></plans-view>`},{path:"/app/group/:groupId/activities",view:a=>n`<activities-view group-id=${a.groupId}></activities-view> `},{path:"/",redirect:"/app"}];D({"wtm-nav":_,"page-header":f,"mu-auth":P.Provider,"mu-history":J.Provider,"mu-switch":class extends G.Element{constructor(){super(mt,"wtm:history","wtm:auth")}},"mu-store":class extends Q.Provider{constructor(){super(Y,K,"wtm:auth")}},"home-view":ht,"plans-view":X,"activities-view":q,"group-list":m,"group-card":p,"activity-list":w,"activity-card":v,"friend-nav":y,"plan-card":h,"plan-list":b,"avatar-circle":$});document.body.addEventListener("theme:toggle",a=>{const t=a.detail.checked;document.body.classList.toggle("light-mode",t)});
