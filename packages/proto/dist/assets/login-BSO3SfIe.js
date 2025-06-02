import{i as l,x as p,r as d,a as f,d as b,b as v}from"./reset.css-GlY_cqLy.js";import{n as u}from"./property-BE6-Eo5M.js";import{r as c}from"./state-_RpdubKC.js";var g=Object.defineProperty,i=(h,r,t,a)=>{for(var e=void 0,o=h.length-1,m;o>=0;o--)(m=h[o])&&(e=m(r,t,e)||e);return e&&g(r,t,e),e};const n=class n extends l{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return p`
      <form
        @change=${r=>this.handleChange(r)}
        @submit=${r=>this.handleSubmit(r)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">
            <slot name="button-label">Login</slot>
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(r){const t=r.target,a=t==null?void 0:t.name,e=t==null?void 0:t.value,o=this.formData;switch(a){case"username":this.formData={...o,username:e};break;case"password":this.formData={...o,password:e};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw"Login failed";return t.json()}).then(t=>{const{token:a}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:a,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[d.styles,f`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
    `];let s=n;i([c()],s.prototype,"formData");i([u()],s.prototype,"api");i([u()],s.prototype,"redirect");i([c()],s.prototype,"error");b({"mu-auth":v.Provider,"login-form":s});
