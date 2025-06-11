import{a as I,i as d,e as B,x as n,r as f,b as l,O as Z,c as S,n as c,V as O,d as j,f as D,h as J,s as V,_ as tt}from"./state-LQEG3evf.js";const et={};function it(a,t,i){switch(a[0]){case"plan/select":at(a[1],i).then(s=>t(e=>({...e,plans:s})));break;case"activity/select":rt(a[1],i).then(s=>t(e=>({...e,activity:s})));break;case"activity/save":st(a[1],i).then(s=>t(e=>({...e,activity:s}))).then(()=>{const{onSuccess:s}=a[1];s&&s()}).catch(s=>{const{onFailure:e}=a[1];e&&e(s)});break;default:throw new Error(`Unhandled message: "${a[0]}"`)}}function at(a,t){return fetch(`/data/plans-${a.planid}.json`,{headers:I.headers(t)}).then(i=>{if(i.status===200)return i.json()}).then(i=>{if(i)return console.log("Plan:",i),i})}function rt(a,t){return fetch(`/api/activities/${a.activityId}`,{headers:I.headers(t)}).then(i=>i.status===200?i.json():void 0).then(i=>{if(i)return console.log("Activity:",i),i})}function st(a,t){return fetch(`/api/activities/${a.activityId}`,{method:"PUT",headers:{"Content-Type":"application/json",...I.headers(t)},body:JSON.stringify(a.activity)}).then(i=>{if(i.status===200)return i.json();throw new Error(`Failed to save activity: ${a.activityId}`)}).then(i=>i)}const T=class T extends d{renderSignOutButton(){return n`
      <button
        class="signout-button"
        @click=${t=>B.relay(t,"auth:message",["auth/signout"])}
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
            @change=${t=>B.relay(t,"theme:toggle",{checked:t.target.checked})}
          />
          <span class="nav-text">Light mode</span>
        </label>

        ${this.renderSignOutButton()}
      </div>
    </nav>`}};T.styles=[f,l`
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
    `];let C=T;var ot=Object.defineProperty,N=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&ot(t,i,e),e};const L=class L extends d{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new Z(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const i=t.user;this.username=i!=null&&i.authenticated?i.username:void 0})}render(){return n`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:n`<a href="/app/group/${this.groupName}/plans"
              >${this.groupName}</a
            >`}
      </h1>
    `}};L.styles=[f,l`
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
    `];let u=L;N([c()],u.prototype,"type");N([c({attribute:"group-name"})],u.prototype,"groupName");N([S()],u.prototype,"username");var nt=Object.defineProperty,Q=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&nt(t,i,e),e};const H=class H extends d{constructor(){super(...arguments),this.groups=[]}willUpdate(t){console.log("GroupList fetching from:",this.src),t.has("src")&&this.src&&this.hydrate(this.src)}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(i=>{if(!i.ok)throw new Error(`Failed to load ${t}`);return i.json()}).then(i=>{this.groups=i}).catch(i=>{console.error(i)})}renderGroup(t){return n`
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
    </div>`}};H.styles=[f,l`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let m=H;Q([c()],m.prototype,"src");Q([S()],m.prototype,"groups");var ct=Object.defineProperty,g=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&ct(t,i,e),e};const A=class A extends d{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return n`<div class="card-container">
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
    </div>`}};A.styles=[f,l`
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
    `];let p=A;g([c()],p.prototype,"groupName");g([c()],p.prototype,"members");g([c()],p.prototype,"upcoming");g([c()],p.prototype,"href");g([c({attribute:"plans-href"})],p.prototype,"plansHref");g([c({attribute:"members-href"})],p.prototype,"membersHref");var lt=Object.defineProperty,G=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&lt(t,i,e),e};const E=class E extends d{constructor(){super(...arguments),this.activeTab="Plans",this.groupId="",this.tabLinks=[{name:"Create",path:"create"},{name:"Plans",path:"plans"},{name:"Activities",path:"activities"},{name:"Availabilities",path:"Availabilities"},{name:"Members",path:"Members"}]}handleSpaNavigate(t){t.preventDefault();const s=t.currentTarget.getAttribute("href");s&&(history.pushState(null,"",s),window.dispatchEvent(new PopStateEvent("popstate")))}render(){return n`
      <nav class="friendbar">
        ${this.tabLinks.map(t=>{const i=`/app/group/${this.groupId}/${t.path}`;return n`
            <a
              class="friendbar-link ${this.activeTab===t.name?"active":""}"
              href="${i}"
              @click=${this.handleSpaNavigate}
            >
              ${t.name}
            </a>
          `})}
      </nav>
    `}};E.styles=[f,l`
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
    `];let y=E;G([c({type:String})],y.prototype,"activeTab");G([c({attribute:"group-id"})],y.prototype,"groupId");const x=l`
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
`;var dt=Object.defineProperty,$=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&dt(t,i,e),e};const U=class U extends d{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(t=>t.trim()).filter(Boolean)}render(){return n`
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
    `}};U.styles=[x,l`
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
    `];let h=U;$([c()],h.prototype,"activity");$([c()],h.prototype,"location");$([c()],h.prototype,"date");$([c()],h.prototype,"going");$([c()],h.prototype,"notes");customElements.define("plan-card",h);var pt=Object.defineProperty,ht=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&pt(t,i,e),e};const q=class q extends d{constructor(){super(...arguments),this.plans=[]}renderPlan(t){return n`
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
    `}};q.styles=[x,l`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let w=q;ht([c({type:Array})],w.prototype,"plans");var vt=Object.defineProperty,ut=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&vt(t,i,e),e};const W=class W extends d{constructor(){super(...arguments),this.initial=""}render(){return n` <div class="circle">${this.initial}</div> `}};W.styles=[f,l`
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
    `];let k=W;ut([c()],k.prototype,"initial");var ft=Object.defineProperty,M=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&ft(t,i,e),e};const F=class F extends d{constructor(){super(...arguments),this.activity="Add Activity",this.location="",this.notes=""}render(){return n`
      <div class="card-container">
        <span class="activity-text">${this.activity}</span>
        <span class="activity-text">${this.location}</span>
        <span class="notes">${this.notes}</span>
        <a class="edit-link" href="/app/edit-activity/684a08c64a2bdb006df8951b">Edit</a>

      </div>
    `}};F.styles=[x,l`
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
    `];let v=F;M([c()],v.prototype,"activity");M([c()],v.prototype,"location");M([c()],v.prototype,"notes");customElements.define("activity-card",v);var gt=Object.defineProperty,mt=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&gt(t,i,e),e};const R=class R extends d{constructor(){super(...arguments),this.activities=[]}renderActivity(t){return n`
      <activity-card
        activity=${t.activity}
        location=${t.location}
        notes=${t.notes}
      ></activity-card>
    `}render(){return n`
      <div class="card-col">
        ${this.activities.map(t=>this.renderActivity(t))}
      </div>
    `}};R.styles=[x,l`
      .card-col {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
    `];let _=R;mt([c({type:Array})],_.prototype,"activities");class yt extends d{render(){return console.log("Rendering home-view"),n`
      <page-header type="home"></page-header>
      <group-list src="/data/groups.json"></group-list>
    `}}var bt=Object.defineProperty,xt=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&bt(t,i,e),e};class K extends O{constructor(){super("wtm:model")}get plans(){return this.model.plans}attributeChangedCallback(t,i,s){super.attributeChangedCallback(t,i,s),t==="group-id"&&s&&this.dispatchMessage(["plan/select",{planid:s}])}render(){return this.plans?n`
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
    `:n`<p>Loading plan info...</p>`}}xt([c({attribute:"group-id"})],K.prototype,"groupId");var $t=Object.defineProperty,wt=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&$t(t,i,e),e};const X=class X extends O{constructor(){super("wtm:model"),this.groupId=""}get activity(){return this.model.activity}attributeChangedCallback(t,i,s){super.attributeChangedCallback(t,i,s),t==="group-id"&&s&&this.dispatchMessage(["activity/select",{activityId:"684a08c64a2bdb006df8951b"}])}render(){return this.activity?n`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header type="group" group-name=${this.groupId}></page-header>

          <friend-nav
            group-id=${this.groupId}
            activeTab="Activities"
          ></friend-nav>
        </div>

        <main>
          <section class="activities">
            <activity-card
              activity=${this.activity.activityName}
              location=${this.activity.location}
              notes=${this.activity.notes}
            ></activity-card>
          </section>
        </main>
      </div>
    `:n`<p>Loading activity data...</p>`}};X.uses=j({"mu-form":D.Element});let P=X;wt([c({attribute:"group-id"})],P.prototype,"groupId");var kt=Object.defineProperty,Y=(a,t,i,s)=>{for(var e=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(e=o(t,i,e)||e);return e&&kt(t,i,e),e};const z=class z extends O{constructor(){super(...arguments),this.activityId="",this.activity={activityName:"",location:"",notes:""}}attributeChangedCallback(t,i,s){super.attributeChangedCallback(t,i,s),t==="activity-id"&&s&&i!==s&&this.dispatchMessage(["activity/select",{activityId:s}])}render(){return n`
      <mu-form .init=${this.activity} @mu-form:submit=${this.handleSubmit}>
        <div class="card-container">
          <label class="activity-text">
            Activity
            <input
              name="activityName"
              value=${this.activity.activityName}
              required
            />
          </label>

          <label class="activity-text">
            Location
            <input name="location" value=${this.activity.location} required />
          </label>

          <label class="notes">
            Notes
            <textarea name="notes">${this.activity.notes}</textarea>
          </label>

          <button type="submit">Save</button>
        </div>
      </mu-form>
    `}handleSubmit(t){const i=t.detail;this.dispatchMessage(["activity/save",{activityId:this.activityId,activity:i,onSuccess:()=>J.dispatch(this,"history/navigate",{href:"/app"}),onFailure:s=>console.error("Save failed:",s)}])}};z.uses=j({"mu-form":D.Element}),z.styles=[x,l`
      mu-form {
        display: flex;
        width: 100%;
      }
      .card-container {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 18px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
        width: 500px;
      }

      .activity-text,
      .notes {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        box-sizing: border-box;
      }

      button {
        width: 100%;
        margin-top: 12px;
        padding: 12px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        background-color: white;
        color: black;
        cursor: pointer;
      }
    `];let b=z;Y([c({attribute:"activity-id"})],b.prototype,"activityId");Y([S()],b.prototype,"activity");const _t=[{path:"/app",view:()=>n`<home-view></home-view>`},{path:"/app/group/:groupId/plans",view:a=>n`<plans-view group-id=${a.groupId}></plans-view>`},{path:"/app/group/:groupId/activities",view:a=>n`<activities-view group-id=${a.groupId}></activities-view> `},{path:"/app/edit-activity/:activityId",view:a=>n`<activity-edit activity-id=${a.activityId}></activity-edit>`},{path:"/",redirect:"/app"}];j({"wtm-nav":C,"page-header":u,"mu-auth":I.Provider,"mu-history":J.Provider,"mu-switch":class extends tt.Element{constructor(){super(_t,"wtm:history","wtm:auth")}},"mu-store":class extends V.Provider{constructor(){super(it,et,"wtm:auth")}},"home-view":yt,"plans-view":K,"activities-view":P,"group-list":m,"group-card":p,"activity-list":_,"activity-card":v,"friend-nav":y,"plan-card":h,"plan-list":w,"avatar-circle":k,"activity-edit":b});document.body.addEventListener("theme:toggle",a=>{const t=a.detail.checked;document.body.classList.toggle("light-mode",t)});
