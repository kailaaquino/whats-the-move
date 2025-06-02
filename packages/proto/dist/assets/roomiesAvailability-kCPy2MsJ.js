import{i as h,x as l,r as v,a as u,d as $,b as N}from"./reset.css-GlY_cqLy.js";import{N as P}from"./nav-bar-B3sAA9Ka.js";import{F as _}from"./friend-nav-CMvY1LuW.js";import{n as d}from"./property-BE6-Eo5M.js";import{r as k}from"./state-_RpdubKC.js";import{P as b}from"./page-header-CT2ts7P7.js";var w=Object.defineProperty,y=(i,e,t,g)=>{for(var r=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(r=s(e,t,r)||r);return r&&w(e,t,r),r};const c=class c extends h{constructor(){super(...arguments),this.memberName="Add Availability",this.date=""}render(){return l`
      <div class="card-container">
        <span class="text">${this.memberName}</span>
        <span class="text">${this.date}</span>
      </div>
    `}};c.styles=[v.styles,u`
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

    `];let n=c;y([d()],n.prototype,"memberName");y([d()],n.prototype,"date");var j=Object.defineProperty,x=(i,e,t,g)=>{for(var r=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(r=s(e,t,r)||r);return r&&j(e,t,r),r};const m=class m extends h{constructor(){super(...arguments),this.availabilities=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(t=>{if(!t.ok)throw new Error(`Failed to load ${e}`);return t.json()}).then(t=>{this.availabilities=t}).catch(t=>{console.error(t)})}renderActivity(e){return l`
      <availability-card
        memberName=${e.memberName}
        date=${e.date}
      ></availability-card>
    `}render(){return l`
      <div class="card-col">
        ${this.availabilities.map(e=>this.renderActivity(e))}
      </div>
    `}};m.styles=[v.styles,u`
      .card-col {
      display: flex;
      flex-direction: column;
      gap: 32px;

      }
    `];let o=m;x([d()],o.prototype,"src");x([k()],o.prototype,"availabilities");$({"wtm-nav":P,"friend-nav":_,"availability-card":n,"availability-list":o,"page-header":b,"mu-auth":N.Provider});var p,f;(f=(p=b).initializeOnce)==null||f.call(p);
