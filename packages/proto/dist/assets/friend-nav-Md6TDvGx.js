import{i as o,x as f,r as m,a as c,n as v}from"./property-CrkbdDop.js";var d=Object.defineProperty,h=(s,e,n,p)=>{for(var a=void 0,r=s.length-1,l;r>=0;r--)(l=s[r])&&(a=l(e,n,a)||a);return a&&d(e,n,a),a};const i=class i extends o{constructor(){super(...arguments),this.activeTab="Plans",this.tabLinks=[{name:"Create",href:"create_plan.html"},{name:"Plans",href:"index.html"},{name:"Activities",href:"activities.html"},{name:"Availability",href:"availability.html"},{name:"Members",href:"members.html"}]}render(){return f`
      <nav class="friendbar">
        ${this.tabLinks.map(e=>f`
            <a
              class="friendbar-link ${this.activeTab===e.name?"active":""}"
              href="${e.href}"
            >
              ${e.name}
            </a>
          `)}
      </nav>
    `}};i.styles=[m.styles,c`
      .friendbar {
        display: flex;
        gap: 2rem;
        align-self: stretch;
        justify-content: flex-start;
        margin: 16px
      }

      .friendbar-link {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        color: var(--color-text-primary);
        padding: var(--space-xs);
        border-radius: var(--radius-sm);
        text-decoration: none;
      }

      .friendbar-link.active {
        border: 1px solid var(--color-text-primary);
      }
    `];let t=i;h([v({type:String})],t.prototype,"activeTab");export{t as F};
