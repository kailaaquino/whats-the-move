import{i as p,x as c,r as d,a as v}from"./reset.css-DKZOVmhf.js";import{n}from"./property-DdMkXYOi.js";var h=Object.defineProperty,f=(s,a,i,u)=>{for(var r=void 0,t=s.length-1,l;t>=0;t--)(l=s[t])&&(r=l(a,i,r)||r);return r&&h(a,i,r),r};const o=class o extends p{constructor(){super(...arguments),this.href="",this.label=""}render(){return c`
      <div class="group-container">
        <a href=${this.href} class="group-title">
          <slot>${this.label}</slot>
        </a>
      </div>
    `}};o.styles=[d.styles,v`
      .group-container {
        width: 300px;
        height: 300px;
        background-color: var(--color-bg-nav);
        display: flex;
        align-items: center; /* vertical center */
        justify-content: center; /* horizontal center */
        overflow: hidden;
        border-radius: var(--radius-sm);
        padding: var(--space-sm);
      }

      .group-title {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        overflow: hidden;
        text-align: center;
        color: var(--color-text-primary);
      }
    `];let e=o;f([n()],e.prototype,"href");f([n()],e.prototype,"label");export{e as A};
