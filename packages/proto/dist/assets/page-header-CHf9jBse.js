import{i as c,O as m,x as p,r as u,a as d}from"./reset.css-GlY_cqLy.js";import{n as l}from"./property-BE6-Eo5M.js";import{r as v}from"./state-_RpdubKC.js";var f=Object.defineProperty,s=(n,r,e,b)=>{for(var t=void 0,a=n.length-1,h;a>=0;a--)(h=n[a])&&(t=h(r,e,t)||t);return t&&f(r,e,t),t};const i=class i extends c{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new m(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{console.log("Auth observer:",r);const e=r.user;this.username=e!=null&&e.authenticated?e.username:void 0})}render(){return p`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:p`<a href="index.html">${this.groupName}</a>`}
      </h1>
    `}};i.styles=[u.styles,d`
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
    `];let o=i;s([l()],o.prototype,"type");s([l({attribute:"group-name"})],o.prototype,"groupName");s([v()],o.prototype,"username");export{o as P};
