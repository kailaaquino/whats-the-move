import{i as l,O as m,x as u,r as c,a as v}from"./reset.css-GlY_cqLy.js";import{n as h}from"./property-BE6-Eo5M.js";import{r as d}from"./state-_RpdubKC.js";var f=Object.defineProperty,a=(n,r,e,b)=>{for(var t=void 0,o=n.length-1,p;o>=0;o--)(p=n[o])&&(t=p(r,e,t)||t);return t&&f(r,e,t),t};const i=class i extends l{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new m(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(r=>{console.log("Auth observer:",r);const e=r.user;this.username=e!=null&&e.authenticated?e.username:void 0})}render(){return u`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:`${this.groupName}`}
      </h1>
    `}};i.styles=[c.styles,v`
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
    `];let s=i;a([h()],s.prototype,"type");a([h({attribute:"group-name"})],s.prototype,"groupName");a([d()],s.prototype,"username");export{s as P};
