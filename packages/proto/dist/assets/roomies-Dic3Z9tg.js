import{i as f,x as d,r as v,a as g,d as b}from"./reset.css-DKZOVmhf.js";import{N as $}from"./nav-bar-BFMUx67p.js";import{F as w}from"./friend-nav-CmpZ41Qr.js";import{n}from"./property-DdMkXYOi.js";import{r as _}from"./state-pgoaCIgN.js";document.body.addEventListener("theme:toggle",a=>{const t=a.detail.checked;document.body.classList.toggle("light-mode",t)});var k=Object.defineProperty,c=(a,t,e,u)=>{for(var i=void 0,r=a.length-1,s;r>=0;r--)(s=a[r])&&(i=s(t,e,i)||i);return i&&k(t,e,i),i};const h=class h extends f{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(t=>t.trim()).filter(Boolean)}render(){return d`
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
    `];let o=h;c([n()],o.prototype,"activity");c([n()],o.prototype,"location");c([n()],o.prototype,"date");c([n()],o.prototype,"going");c([n()],o.prototype,"notes");var z=Object.defineProperty,j=(a,t,e,u)=>{for(var i=void 0,r=a.length-1,s;r>=0;r--)(s=a[r])&&(i=s(t,e,i)||i);return i&&z(t,e,i),i};const y=class y extends f{constructor(){super(...arguments),this.initial=""}render(){return d` <div class="circle">${this.initial}</div> `}};y.styles=[v.styles,g`
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
    `];let p=y;j([n()],p.prototype,"initial");var N=Object.defineProperty,x=(a,t,e,u)=>{for(var i=void 0,r=a.length-1,s;r>=0;r--)(s=a[r])&&(i=s(t,e,i)||i);return i&&N(t,e,i),i};const m=class m extends f{constructor(){super(...arguments),this.plans=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(e=>{if(!e.ok)throw new Error(`Failed to load ${t}`);return e.json()}).then(e=>{this.plans=e}).catch(e=>{console.error(e)})}renderPlan(t){return d`
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
    `}};m.styles=[v.styles,g`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let l=m;x([n()],l.prototype,"src");x([_()],l.prototype,"plans");b({"wtm-nav":$,"friend-nav":w,"plan-card":o,"avatar-circle":p,"plan-list":l});
