import{i as h,x as m,r as p,b,c as u,n as l,d as f,a as g}from"./state-BkmdFmxF.js";var v=Object.defineProperty,n=(c,o,t,s)=>{for(var r=void 0,a=c.length-1,d;a>=0;a--)(d=c[a])&&(r=d(o,t,r)||r);return r&&v(o,t,r),r};const i=class i extends h{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return m`
      <form
        @change=${o=>this.handleChange(o)}
        @submit=${o=>this.handleSubmit(o)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">
            <slot name="button-label">Login</slot>
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(o){const t=o.target,s=t==null?void 0:t.name,r=t==null?void 0:t.value,a=this.formData;switch(s){case"username":this.formData={...a,username:r};break;case"password":this.formData={...a,password:r};break}}handleSubmit(o){o.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:s}=t,r=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:s,redirect:this.redirect}]});console.log("dispatching message",r),this.dispatchEvent(r)}).catch(t=>{console.log(t),this.error=t.toString()})}};i.styles=[p,b`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
      button {
        background-color: var(--color-bg-dark);
        color: var(--color-text-primary);
        font-weight: bold;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:hover:enabled {
        background-color: #59deff;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `];let e=i;n([u()],e.prototype,"formData");n([l()],e.prototype,"api");n([l()],e.prototype,"redirect");n([u()],e.prototype,"error");f({"mu-auth":g.Provider,"login-form":e});
