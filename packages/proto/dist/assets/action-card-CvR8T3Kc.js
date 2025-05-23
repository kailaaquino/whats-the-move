import{i as f,x as p,r as d,a as v,n}from"./property-CrkbdDop.js";var h=Object.defineProperty,c=(s,a,i,u)=>{for(var e=void 0,t=s.length-1,l;t>=0;t--)(l=s[t])&&(e=l(a,i,e)||e);return e&&h(a,i,e),e};const o=class o extends f{constructor(){super(...arguments),this.href="",this.label=""}render(){return p`
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
    `];let r=o;c([n()],r.prototype,"href");c([n()],r.prototype,"label");export{r as A};
