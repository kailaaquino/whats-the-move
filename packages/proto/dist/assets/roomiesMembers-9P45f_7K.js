import{i as p,x as c,r as f,a as m,n as d,d as b}from"./property-BffYu5Uq.js";import{A as N}from"./action-card-Dhc-MBPV.js";import{N as $}from"./nav-bar-dHfWQa5T.js";import{r as w}from"./state-BroQ6gKo.js";import{F as k}from"./friend-nav-CZo-G2EN.js";var _=Object.defineProperty,j=(a,e,r,y)=>{for(var t=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(t=s(e,r,t)||t);return t&&_(e,r,t),t};const v=class v extends p{constructor(){super(...arguments),this.initial=""}render(){return c` <div class="circle">${this.initial}</div> `}};v.styles=[f.styles,m`
      .circle {
        display: flex;
        width: 62px;
        height: 62px;
        padding: 17px 23px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: var(--color-text-primary);
        color: var(--color-bg-dark);
        border-radius: 31px;
        background: var(--color-text-primary);
        font-family: var(--font-body);
      }
    `];let l=v;j([d()],l.prototype,"initial");var P=Object.defineProperty,u=(a,e,r,y)=>{for(var t=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(t=s(e,r,t)||t);return t&&P(e,r,t),t};const x=class x extends p{constructor(){super(...arguments),this.firstName="",this.lastName=""}render(){var r;const e=((r=this.firstName)==null?void 0:r.charAt(0).toUpperCase())??"";return c`
      <div class="container">
        <div class="content-container">
          <member-circle .initial=${e}></member-circle>
          <div class="text-container">
            <span class="text-style">${this.firstName}</span>
            <span class="text-style">${this.lastName}</span>
          </div>
        </div>
      </div>
    `}};x.styles=[f.styles,m`
      .container {
        display: flex;
        width: 235px;
        height: 235px;
        padding: 23px 4px 59px 0px;
        align-items: center;
        flex-shrink: 0;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .text-style {
        font-family: var(--font-body);
        font-size: var(--size-font-body);
        color: var(--color-text-primary);
      }
      .text-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
      }
      .content-container {
        display: flex;
        width: 231px;
        padding: 8px;
        flex-direction: column;
        align-items: center;
        gap: 47px;
        flex-shrink: 0;
      }
    `];let n=x;u([d()],n.prototype,"firstName");u([d()],n.prototype,"lastName");var A=Object.defineProperty,g=(a,e,r,y)=>{for(var t=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(t=s(e,r,t)||t);return t&&A(e,r,t),t};const h=class h extends p{constructor(){super(...arguments),this.members=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`Failed to load ${e}`);return r.json()}).then(r=>{this.members=r}).catch(r=>{console.error(r)})}renderActivity(e){return c`
      <member-card
        firstName=${e.firstName}
        lastName=${e.lastName}
      ></member-card>
    `}render(){return c`
      <div class="card-row">
        ${this.members.map(e=>this.renderActivity(e))}
      </div>
    `}};h.styles=[f.styles,m`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let o=h;g([d()],o.prototype,"src");g([w()],o.prototype,"members");b({"action-card":N,"wtm-nav":$,"friend-nav":k,"member-circle":l,"member-card":n,"member-list":o});
