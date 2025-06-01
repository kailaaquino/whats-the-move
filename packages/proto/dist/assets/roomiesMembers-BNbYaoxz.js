import{i as p,x as l,r as f,a as m,d as b}from"./reset.css-DKZOVmhf.js";import{N}from"./nav-bar-BFMUx67p.js";import{n as d}from"./property-DdMkXYOi.js";import{r as $}from"./state-pgoaCIgN.js";import{F as w}from"./friend-nav-CmpZ41Qr.js";var k=Object.defineProperty,_=(s,e,r,y)=>{for(var t=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(t=a(e,r,t)||t);return t&&k(e,r,t),t};const v=class v extends p{constructor(){super(...arguments),this.initial=""}render(){return l` <div class="circle">${this.initial}</div> `}};v.styles=[f.styles,m`
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
    `];let c=v;_([d()],c.prototype,"initial");var j=Object.defineProperty,u=(s,e,r,y)=>{for(var t=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(t=a(e,r,t)||t);return t&&j(e,r,t),t};const x=class x extends p{constructor(){super(...arguments),this.firstName="",this.lastName=""}render(){var r;const e=((r=this.firstName)==null?void 0:r.charAt(0).toUpperCase())??"";return l`
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
    `];let n=x;u([d()],n.prototype,"firstName");u([d()],n.prototype,"lastName");var P=Object.defineProperty,g=(s,e,r,y)=>{for(var t=void 0,i=s.length-1,a;i>=0;i--)(a=s[i])&&(t=a(e,r,t)||t);return t&&P(e,r,t),t};const h=class h extends p{constructor(){super(...arguments),this.members=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`Failed to load ${e}`);return r.json()}).then(r=>{this.members=r}).catch(r=>{console.error(r)})}renderActivity(e){return l`
      <member-card
        firstName=${e.firstName}
        lastName=${e.lastName}
      ></member-card>
    `}render(){return l`
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
    `];let o=h;g([d()],o.prototype,"src");g([$()],o.prototype,"members");b({"wtm-nav":N,"friend-nav":w,"member-circle":c,"member-card":n,"member-list":o});
