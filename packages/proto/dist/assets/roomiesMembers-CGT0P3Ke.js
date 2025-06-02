import{i as p,x as l,r as m,a as f,d as w,b as k}from"./reset.css-GlY_cqLy.js";import{N as P}from"./nav-bar-B3sAA9Ka.js";import{n as d}from"./property-BE6-Eo5M.js";import{r as _}from"./state-_RpdubKC.js";import{F as j}from"./friend-nav-CMvY1LuW.js";import{P as b}from"./page-header-CT2ts7P7.js";var O=Object.defineProperty,z=(i,t,r,u)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&O(t,r,e),e};const v=class v extends p{constructor(){super(...arguments),this.initial=""}render(){return l` <div class="circle">${this.initial}</div> `}};v.styles=[m.styles,f`
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
    `];let c=v;z([d()],c.prototype,"initial");var A=Object.defineProperty,N=(i,t,r,u)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&A(t,r,e),e};const h=class h extends p{constructor(){super(...arguments),this.firstName="",this.lastName=""}render(){var r;const t=((r=this.firstName)==null?void 0:r.charAt(0).toUpperCase())??"";return l`
      <div class="container">
        <div class="content-container">
          <member-circle .initial=${t}></member-circle>
          <div class="text-container">
            <span class="text-style">${this.firstName}</span>
            <span class="text-style">${this.lastName}</span>
          </div>
        </div>
      </div>
    `}};h.styles=[m.styles,f`
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
    `];let n=h;N([d()],n.prototype,"firstName");N([d()],n.prototype,"lastName");var F=Object.defineProperty,$=(i,t,r,u)=>{for(var e=void 0,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=s(t,r,e)||e);return e&&F(t,r,e),e};const x=class x extends p{constructor(){super(...arguments),this.members=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(r=>{if(!r.ok)throw new Error(`Failed to load ${t}`);return r.json()}).then(r=>{this.members=r}).catch(r=>{console.error(r)})}renderActivity(t){return l`
      <member-card
        firstName=${t.firstName}
        lastName=${t.lastName}
      ></member-card>
    `}render(){return l`
      <div class="card-row">
        ${this.members.map(t=>this.renderActivity(t))}
      </div>
    `}};x.styles=[m.styles,f`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let o=x;$([d()],o.prototype,"src");$([_()],o.prototype,"members");w({"wtm-nav":P,"friend-nav":j,"member-circle":c,"member-card":n,"member-list":o,"page-header":b,"mu-auth":k.Provider});var y,g;(g=(y=b).initializeOnce)==null||g.call(y);
