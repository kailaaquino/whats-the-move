import{i as p,x as l,r as f,a as v,n as d,d as y}from"./property-BffYu5Uq.js";import{A as x}from"./action-card-Dhc-MBPV.js";import{N as g}from"./nav-bar-dHfWQa5T.js";import{F as $}from"./friend-nav-CZo-G2EN.js";import{r as N}from"./state-BroQ6gKo.js";var _=Object.defineProperty,h=(i,e,r,b)=>{for(var t=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(t=s(e,r,t)||t);return t&&_(e,r,t),t};const c=class c extends p{constructor(){super(...arguments),this.memberName="Add Availability",this.date=""}render(){return l`
      <div class="card-container">
        <span class="text">${this.memberName}</span>
        <span class="text">${this.date}</span>
      </div>
    `}};c.styles=[f.styles,v`
      .card-container {
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: left;
        gap: 8px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .text {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

    `];let n=c;h([d()],n.prototype,"memberName");h([d()],n.prototype,"date");var k=Object.defineProperty,u=(i,e,r,b)=>{for(var t=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(t=s(e,r,t)||t);return t&&k(e,r,t),t};const m=class m extends p{constructor(){super(...arguments),this.availabilities=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`Failed to load ${e}`);return r.json()}).then(r=>{this.availabilities=r}).catch(r=>{console.error(r)})}renderActivity(e){return l`
      <availability-card
        memberName=${e.memberName}
        date=${e.date}
      ></availability-card>
    `}render(){return l`
      <div class="card-col">
        ${this.availabilities.map(e=>this.renderActivity(e))}
      </div>
    `}};m.styles=[f.styles,v`
      .card-col {
      display: flex;
      flex-direction: column;
      gap: 32px;

      }
    `];let o=m;u([d()],o.prototype,"src");u([N()],o.prototype,"availabilities");y({"action-card":x,"wtm-nav":g,"friend-nav":$,"availability-card":n,"availability-list":o});
