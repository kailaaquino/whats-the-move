import{i as f,x as d,r as v,a as g,d as z,b as _}from"./reset.css-GlY_cqLy.js";import{N as k}from"./nav-bar-BGzyEcHL.js";import{F as P}from"./friend-nav-CMvY1LuW.js";import{n}from"./property-BE6-Eo5M.js";import{r as j}from"./state-_RpdubKC.js";import{P as $}from"./page-header-CHf9jBse.js";var N=Object.defineProperty,c=(r,t,i,u)=>{for(var e=void 0,a=r.length-1,s;a>=0;a--)(s=r[a])&&(e=s(t,i,e)||e);return e&&N(t,i,e),e};const h=class h extends f{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(t=>t.trim()).filter(Boolean)}render(){return d`
      <div class="card-container">
        <span class="activity">${this.activity}</span>
        <span class="date">${this.date}</span>
        <div class="going">
          <span>Going:</span>
          <div class="avatar-list">
            ${this.goingList.map(t=>d`<avatar-circle .initial=${t}></avatar-circle>`)}
          </div>
        </div>
        <span class="notes"> Notes: ${this.notes}</span>
      </div>
    `}};h.styles=[v.styles,g`
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
    `];let o=h;c([n()],o.prototype,"activity");c([n()],o.prototype,"location");c([n()],o.prototype,"date");c([n()],o.prototype,"going");c([n()],o.prototype,"notes");var O=Object.defineProperty,F=(r,t,i,u)=>{for(var e=void 0,a=r.length-1,s;a>=0;a--)(s=r[a])&&(e=s(t,i,e)||e);return e&&O(t,i,e),e};const m=class m extends f{constructor(){super(...arguments),this.initial=""}render(){return d` <div class="circle">${this.initial}</div> `}};m.styles=[v.styles,g`
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
    `];let p=m;F([n()],p.prototype,"initial");var B=Object.defineProperty,w=(r,t,i,u)=>{for(var e=void 0,a=r.length-1,s;a>=0;a--)(s=r[a])&&(e=s(t,i,e)||e);return e&&B(t,i,e),e};const y=class y extends f{constructor(){super(...arguments),this.plans=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(i=>{if(!i.ok)throw new Error(`Failed to load ${t}`);return i.json()}).then(i=>{this.plans=i}).catch(i=>{console.error(i)})}renderPlan(t){return d`
      <plan-card
        activity=${t.activity}
        location=${t.location}
        date=${t.date}
        going=${t.going}
        notes=${t.notes}
      ></plan-card>
    `}render(){return d`
      <div class="card-row">
        ${this.plans.map(t=>this.renderPlan(t))}
      </div>
    `}};y.styles=[v.styles,g`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let l=y;w([n()],l.prototype,"src");w([j()],l.prototype,"plans");z({"wtm-nav":k,"friend-nav":P,"plan-card":o,"avatar-circle":p,"plan-list":l,"page-header":$,"mu-auth":_.Provider});var x,b;(b=(x=$).initializeOnce)==null||b.call(x);document.body.addEventListener("theme:toggle",r=>{const t=r.detail.checked;document.body.classList.toggle("light-mode",t)});
