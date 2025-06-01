import{i as p,x as l,r as f,a as v,d as y}from"./reset.css-DKZOVmhf.js";import{N as x}from"./nav-bar-BFMUx67p.js";import{F as g}from"./friend-nav-CmpZ41Qr.js";import{n as d}from"./property-DdMkXYOi.js";import{r as $}from"./state-pgoaCIgN.js";var N=Object.defineProperty,h=(i,e,r,b)=>{for(var t=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(t=s(e,r,t)||t);return t&&N(e,r,t),t};const c=class c extends p{constructor(){super(...arguments),this.memberName="Add Availability",this.date=""}render(){return l`
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

    `];let n=c;h([d()],n.prototype,"memberName");h([d()],n.prototype,"date");var _=Object.defineProperty,u=(i,e,r,b)=>{for(var t=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(t=s(e,r,t)||t);return t&&_(e,r,t),t};const m=class m extends p{constructor(){super(...arguments),this.availabilities=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`Failed to load ${e}`);return r.json()}).then(r=>{this.availabilities=r}).catch(r=>{console.error(r)})}renderActivity(e){return l`
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
    `];let o=m;u([d()],o.prototype,"src");u([$()],o.prototype,"availabilities");y({"wtm-nav":x,"friend-nav":g,"availability-card":n,"availability-list":o});
