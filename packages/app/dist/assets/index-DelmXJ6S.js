(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();var Y,Te;class ht extends Error{}ht.prototype.name="InvalidTokenError";function Zs(i){return decodeURIComponent(atob(i).replace(/(.)/g,(t,e)=>{let r=e.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}function Qs(i){let t=i.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Zs(t)}catch{return atob(t)}}function as(i,t){if(typeof i!="string")throw new ht("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,r=i.split(".")[e];if(typeof r!="string")throw new ht(`Invalid token specified: missing part #${e+1}`);let s;try{s=Qs(r)}catch(n){throw new ht(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(s)}catch(n){throw new ht(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const Xs="mu:context",ee=`${Xs}:change`;class tr{constructor(t,e){this._proxy=er(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class ls extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new tr(t,this),this.style.display="contents"}attach(t){return this.addEventListener(ee,t),t}detach(t){this.removeEventListener(ee,t)}}function er(i,t){return new Proxy(i,{get:(r,s,n)=>{if(s==="then")return;const o=Reflect.get(r,s,n);return console.log(`Context['${s}'] => `,o),o},set:(r,s,n,o)=>{const l=i[s];console.log(`Context['${s.toString()}'] <= `,n);const a=Reflect.set(r,s,n,o);if(a){let d=new CustomEvent(ee,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(d,{property:s,oldValue:l,value:n}),t.dispatchEvent(d)}else console.log(`Context['${s}] was not set to ${n}`);return a}})}function sr(i,t){const e=cs(t,i);return new Promise((r,s)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>r(e))}else s({context:t,reason:`No provider for this context "${t}:`})})}function cs(i,t){const e=`[provides="${i}"]`;if(!t||t===document.getRootNode())return;const r=t.closest(e);if(r)return r;const s=t.getRootNode();if(s instanceof ShadowRoot)return cs(i,s.host)}class rr extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function hs(i="mu:message"){return(t,...e)=>t.dispatchEvent(new rr(e,i))}class ae{constructor(t,e,r="service:message",s=!0){this._pending=[],this._context=e,this._update=t,this._eventType=r,this._running=s}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const r=e.detail;this.consume(r)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function ir(i){return t=>({...t,...i})}const se="mu:auth:jwt",us=class ds extends ae{constructor(t,e){super((r,s)=>this.update(r,s),t,ds.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:r,redirect:s}=t[1];return e(or(r)),Jt(s);case"auth/signout":return e(ar()),Jt(this._redirectForLogin);case"auth/redirect":return Jt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};us.EVENT_TYPE="auth:message";let ps=us;const fs=hs(ps.EVENT_TYPE);function Jt(i,t={}){if(!i)return;const e=window.location.href,r=new URL(i,e);return Object.entries(t).forEach(([s,n])=>r.searchParams.set(s,n)),()=>{console.log("Redirecting to ",i),window.location.assign(r)}}class nr extends ls{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=Q.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new ps(this.context,this.redirect).attach(this)}}class ft{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(se),t}}class Q extends ft{constructor(t){super();const e=as(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new Q(t);return localStorage.setItem(se,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(se);return t?Q.authenticate(t):new ft}}function or(i){return ir({user:Q.authenticate(i),token:i})}function ar(){return i=>{const t=i.user;return{user:t&&t.authenticated?ft.deauthenticate(t):t,token:""}}}function lr(i){return i.authenticated?{Authorization:`Bearer ${i.token||"NO_TOKEN"}`}:{}}function cr(i){return i.authenticated?as(i.token||""):{}}const hr=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:Q,Provider:nr,User:ft,dispatch:fs,headers:lr,payload:cr},Symbol.toStringTag,{value:"Module"}));function Tt(i,t,e){const r=i.target,s=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${i.type}:`,s),r.dispatchEvent(s),i.stopPropagation()}function re(i,t="*"){return i.composedPath().find(r=>{const s=r;return s.tagName&&s.matches(t)})}const Re=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:re,relay:Tt},Symbol.toStringTag,{value:"Module"}));function ms(i,...t){const e=i.map((s,n)=>n?[t[n-1],s]:[s]).flat().join("");let r=new CSSStyleSheet;return r.replaceSync(e),r}const ur=new DOMParser;function D(i,...t){const e=t.map(l),r=i.map((a,d)=>{if(d===0)return[a];const f=e[d-1];return f instanceof Node?[`<ins id="mu-html-${d-1}"></ins>`,a]:[f,a]}).flat().join(""),s=ur.parseFromString(r,"text/html"),n=s.head.childElementCount?s.head.children:s.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,d)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${d}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${d}`)}}),o;function l(a,d){if(a===null)return"";switch(typeof a){case"string":return Ne(a);case"bigint":case"boolean":case"number":case"symbol":return Ne(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Ne(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zt(i,t={mode:"open"}){const e=i.attachShadow(t),r={template:s,styles:n};return r;function s(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),r}function n(...o){e.adoptedStyleSheets=o}}Y=class extends HTMLElement{constructor(){super(),this._state={},zt(this).template(Y.template).styles(Y.styles),this.addEventListener("change",i=>{const t=i.target;if(t){const e=t.name,r=t.value;e&&(this._state[e]=r)}}),this.form&&this.form.addEventListener("submit",i=>{i.preventDefault(),Tt(i,"mu-form:submit",this._state)})}set init(i){this._state=i||{},dr(this._state,this)}get form(){var i;return(i=this.shadowRoot)==null?void 0:i.querySelector("form")}},Y.template=D`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,Y.styles=ms`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;function dr(i,t){const e=Object.entries(i);for(const[r,s]of e){const n=t.querySelector(`[name="${r}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!s;break;case"date":o.value=s.toISOString().substr(0,10);break;default:o.value=s;break}}}return i}const gs=class vs extends ae{constructor(t){super((e,r)=>this.update(e,r),t,vs.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:r,state:s}=t[1];e(fr(r,s));break}case"history/redirect":{const{href:r,state:s}=t[1];e(mr(r,s));break}}}};gs.EVENT_TYPE="history:message";let le=gs;class Ue extends ls{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=pr(t);if(e){const r=new URL(e.href);r.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),ce(e,"history/navigate",{href:r.pathname+r.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new le(this.context).attach(this)}}function pr(i){const t=i.currentTarget,e=r=>r.tagName=="A"&&r.href;if(i.button===0)if(i.composed){const s=i.composedPath().find(e);return s||void 0}else{for(let r=i.target;r;r===t?null:r.parentElement)if(e(r))return r;return}}function fr(i,t={}){return history.pushState(t,"",i),()=>({location:document.location,state:history.state})}function mr(i,t={}){return history.replaceState(t,"",i),()=>({location:document.location,state:history.state})}const ce=hs(le.EVENT_TYPE),gr=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:Ue,Provider:Ue,Service:le,dispatch:ce},Symbol.toStringTag,{value:"Module"}));class mt{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,r)=>{if(this._provider){const s=new Le(this._provider,t);this._effects.push(s),e(s)}else sr(this._target,this._contextLabel).then(s=>{const n=new Le(s,t);this._provider=s,this._effects.push(n),s.attach(o=>this._handleChange(o)),e(n)}).catch(s=>console.log(`Observer ${this._contextLabel}: ${s}`,s))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class Le{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const ys=class _s extends HTMLElement{constructor(){super(),this._state={},this._user=new ft,this._authObserver=new mt(this,"blazing:auth"),zt(this).template(_s.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",r=this.isNew?"created":"updated",s=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;vr(s,this._state,e,this.authorization).then(n=>ot(n,this)).then(n=>{const o=`mu-rest-form:${r}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[r]:n,url:s}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:s,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const r=e.name,s=e.value;r&&(this._state[r]=s)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},ot(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&Me(this.src,this.authorization).then(e=>{this._state=e,ot(e,this)}))})}attributeChangedCallback(t,e,r){switch(t){case"src":this.src&&r&&r!==e&&!this.isNew&&Me(this.src,this.authorization).then(s=>{this._state=s,ot(s,this)});break;case"new":r&&(this._state={},ot({},this));break}}};ys.observedAttributes=["src","new","action"];ys.template=D`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function Me(i,t){return fetch(i,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${i}:`,e))}function ot(i,t){const e=Object.entries(i);for(const[r,s]of e){const n=t.querySelector(`[name="${r}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!s;break;default:o.value=s;break}}}return i}function vr(i,t,e="PUT",r={}){return fetch(i,{method:e,headers:{"Content-Type":"application/json",...r},body:JSON.stringify(t)}).then(s=>{if(s.status!=200&&s.status!=201)throw`Form submission failed: Status ${s.status}`;return s.json()})}const yr=class $s extends ae{constructor(t,e){super(e,t,$s.EVENT_TYPE,!1)}};yr.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,he=Ct.ShadowRoot&&(Ct.ShadyCSS===void 0||Ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ue=Symbol(),He=new WeakMap;let bs=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(he&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=He.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&He.set(e,t))}return t}toString(){return this.cssText}};const _r=i=>new bs(typeof i=="string"?i:i+"",void 0,ue),$r=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new bs(e,i,ue)},br=(i,t)=>{if(he)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),s=Ct.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},je=he?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return _r(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ar,defineProperty:Er,getOwnPropertyDescriptor:wr,getOwnPropertyNames:xr,getOwnPropertySymbols:Sr,getPrototypeOf:Pr}=Object,X=globalThis,Ie=X.trustedTypes,kr=Ie?Ie.emptyScript:"",ze=X.reactiveElementPolyfillSupport,ut=(i,t)=>i,Rt={toAttribute(i,t){switch(t){case Boolean:i=i?kr:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},de=(i,t)=>!Ar(i,t),De={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:de};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),X.litPropertyMetadata??(X.litPropertyMetadata=new WeakMap);let J=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=De){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Er(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:n}=wr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??De}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;const t=Pr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){const e=this.properties,r=[...xr(e),...Sr(e)];for(const s of r)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)e.unshift(je(s))}else t!==void 0&&e.push(je(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return br(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var r;const s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:Rt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var r;const s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=s.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:Rt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??de)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(t=this._$EO)==null||t.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(r)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[ut("elementProperties")]=new Map,J[ut("finalized")]=new Map,ze==null||ze({ReactiveElement:J}),(X.reactiveElementVersions??(X.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=globalThis,Ut=Nt.trustedTypes,Ve=Ut?Ut.createPolicy("lit-html",{createHTML:i=>i}):void 0,As="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Es="?"+O,Cr=`<${Es}>`,q=document,gt=()=>q.createComment(""),vt=i=>i===null||typeof i!="object"&&typeof i!="function",pe=Array.isArray,Or=i=>pe(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Gt=`[ 	
\f\r]`,at=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qe=/-->/g,Be=/>/g,H=RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,We=/"/g,ws=/^(?:script|style|textarea|title)$/i,Tr=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),lt=Tr(1),tt=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Ye=new WeakMap,I=q.createTreeWalker(q,129);function xs(i,t){if(!pe(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ve!==void 0?Ve.createHTML(t):t}const Rr=(i,t)=>{const e=i.length-1,r=[];let s,n=t===2?"<svg>":t===3?"<math>":"",o=at;for(let l=0;l<e;l++){const a=i[l];let d,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===at?f[1]==="!--"?o=qe:f[1]!==void 0?o=Be:f[2]!==void 0?(ws.test(f[2])&&(s=RegExp("</"+f[2],"g")),o=H):f[3]!==void 0&&(o=H):o===H?f[0]===">"?(o=s??at,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?H:f[3]==='"'?We:Fe):o===We||o===Fe?o=H:o===qe||o===Be?o=at:(o=H,s=void 0);const h=o===H&&i[l+1].startsWith("/>")?" ":"";n+=o===at?a+Cr:u>=0?(r.push(d),a.slice(0,u)+As+a.slice(u)+O+h):a+O+(u===-2?l:h)}return[xs(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};let ie=class Ss{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Rr(t,e);if(this.el=Ss.createElement(d,r),I.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=I.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(As)){const c=f[o++],h=s.getAttribute(u).split(O),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Ur:p[1]==="?"?Lr:p[1]==="@"?Mr:Dt}),s.removeAttribute(u)}else u.startsWith(O)&&(a.push({type:6,index:n}),s.removeAttribute(u));if(ws.test(s.tagName)){const u=s.textContent.split(O),c=u.length-1;if(c>0){s.textContent=Ut?Ut.emptyScript:"";for(let h=0;h<c;h++)s.append(u[h],gt()),I.nextNode(),a.push({type:2,index:++n});s.append(u[c],gt())}}}else if(s.nodeType===8)if(s.data===Es)a.push({type:2,index:n});else{let u=-1;for(;(u=s.data.indexOf(O,u+1))!==-1;)a.push({type:7,index:n}),u+=O.length-1}n++}}static createElement(t,e){const r=q.createElement("template");return r.innerHTML=t,r}};function et(i,t,e=i,r){var s,n;if(t===tt)return t;let o=r!==void 0?(s=e.o)==null?void 0:s[r]:e.l;const l=vt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(i),o._$AT(i,e,r)),r!==void 0?(e.o??(e.o=[]))[r]=o:e.l=o),o!==void 0&&(t=et(i,o._$AS(i,t.values),o,r)),t}class Nr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=((t==null?void 0:t.creationScope)??q).importNode(e,!0);I.currentNode=s;let n=I.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Et(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Hr(n,this,t)),this._$AV.push(d),a=r[++l]}o!==(a==null?void 0:a.index)&&(n=I.nextNode(),o++)}return I.currentNode=q,s}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Et{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,r,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this.v=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),vt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==tt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Or(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&vt(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){var e;const{values:r,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ie.createElement(xs(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(r);else{const o=new Nr(n,this),l=o.u(this.options);o.p(r),this.T(l),this._$AH=o}}_$AC(t){let e=Ye.get(t.strings);return e===void 0&&Ye.set(t.strings,e=new ie(t)),e}k(t){pe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const n of t)s===e.length?e.push(r=new Et(this.O(gt()),this.O(gt()),this,this.options)):r=e[s],r._$AI(n),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Dt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=b}_$AI(t,e=this,r,s){const n=this.strings;let o=!1;if(n===void 0)t=et(this,t,e,0),o=!vt(t)||t!==this._$AH&&t!==tt,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=et(this,l[r+a],e,a),d===tt&&(d=this._$AH[a]),o||(o=!vt(d)||d!==this._$AH[a]),d===b?t=b:t!==b&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ur extends Dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Lr extends Dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Mr extends Dt{constructor(t,e,r,s,n){super(t,e,r,s,n),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??b)===tt)return;const r=this._$AH,s=t===b&&r!==b||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==b&&(r===b||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Hr{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const Ke=Nt.litHtmlPolyfillSupport;Ke==null||Ke(ie,Et),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.2.0");const jr=(i,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let s=r._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;r._$litPart$=s=new Et(t.insertBefore(gt(),n),n,void 0,e??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Z=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=jr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return tt}};Z._$litElement$=!0,Z.finalized=!0,(Te=globalThis.litElementHydrateSupport)==null||Te.call(globalThis,{LitElement:Z});const Je=globalThis.litElementPolyfillSupport;Je==null||Je({LitElement:Z});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ir={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:de},zr=(i=Ir,t,e)=>{const{kind:r,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,i),r==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,i)},init(l){return l!==void 0&&this.P(o,void 0,i),l}}}if(r==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+r)};function Ps(i){return(t,e)=>typeof e=="object"?zr(i,t,e):((r,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...r,wrapped:!0}:r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ks(i){return Ps({...i,state:!0,attribute:!1})}function Dr(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function Vr(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Cs={};(function(i){var t=function(){var e=function(u,c,h,p){for(h=h||{},p=u.length;p--;h[u[p]]=c);return h},r=[1,9],s=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,m,v,Bt){var x=v.length-1;switch(m){case 1:return new g.Root({},[v[x-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[v[x-1],v[x]]);break;case 4:case 5:this.$=v[x];break;case 6:this.$=new g.Literal({value:v[x]});break;case 7:this.$=new g.Splat({name:v[x]});break;case 8:this.$=new g.Param({name:v[x]});break;case 9:this.$=new g.Optional({},[v[x-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:r,13:s,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:r,13:s,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:r,13:s,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:r,12:[1,16],13:s,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,m){this.message=g,this.hash=m};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],m=[],v=this.table,Bt="",x=0,ke=0,Ys=2,Ce=1,Ks=m.slice.call(arguments,1),$=Object.create(this.lexer),L={yy:{}};for(var Ft in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Ft)&&(L.yy[Ft]=this.yy[Ft]);$.setInput(c,L.yy),L.yy.lexer=$,L.yy.parser=this,typeof $.yylloc>"u"&&($.yylloc={});var Wt=$.yylloc;m.push(Wt);var Js=$.options&&$.options.ranges;typeof L.yy.parseError=="function"?this.parseError=L.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var Gs=function(){var W;return W=$.lex()||Ce,typeof W!="number"&&(W=h.symbols_[W]||W),W},E,M,S,Yt,F={},Pt,P,Oe,kt;;){if(M=p[p.length-1],this.defaultActions[M]?S=this.defaultActions[M]:((E===null||typeof E>"u")&&(E=Gs()),S=v[M]&&v[M][E]),typeof S>"u"||!S.length||!S[0]){var Kt="";kt=[];for(Pt in v[M])this.terminals_[Pt]&&Pt>Ys&&kt.push("'"+this.terminals_[Pt]+"'");$.showPosition?Kt="Parse error on line "+(x+1)+`:
`+$.showPosition()+`
Expecting `+kt.join(", ")+", got '"+(this.terminals_[E]||E)+"'":Kt="Parse error on line "+(x+1)+": Unexpected "+(E==Ce?"end of input":"'"+(this.terminals_[E]||E)+"'"),this.parseError(Kt,{text:$.match,token:this.terminals_[E]||E,line:$.yylineno,loc:Wt,expected:kt})}if(S[0]instanceof Array&&S.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+E);switch(S[0]){case 1:p.push(E),g.push($.yytext),m.push($.yylloc),p.push(S[1]),E=null,ke=$.yyleng,Bt=$.yytext,x=$.yylineno,Wt=$.yylloc;break;case 2:if(P=this.productions_[S[1]][1],F.$=g[g.length-P],F._$={first_line:m[m.length-(P||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(P||1)].first_column,last_column:m[m.length-1].last_column},Js&&(F._$.range=[m[m.length-(P||1)].range[0],m[m.length-1].range[1]]),Yt=this.performAction.apply(F,[Bt,ke,x,L.yy,S[1],g,m].concat(Ks)),typeof Yt<"u")return Yt;P&&(p=p.slice(0,-1*P*2),g=g.slice(0,-1*P),m=m.slice(0,-1*P)),p.push(this.productions_[S[1]][0]),g.push(F.$),m.push(F._$),Oe=v[p[p.length-2]][p[p.length-1]],p.push(Oe);break;case 3:return!0}}return!0}},d=function(){var u={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var v in m)this[v]=m[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),v=0;v<m.length;v++)if(p=this._input.match(this.rules[m[v]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=v,this.options.backtrack_lexer){if(c=this.test_match(p,m[v]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=d;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Vr<"u"&&(i.parser=t,i.Parser=t.Parser,i.parse=function(){return t.parse.apply(t,arguments)})})(Cs);function K(i){return function(t,e){return{displayName:i,props:t,children:e||[]}}}var Os={Root:K("Root"),Concat:K("Concat"),Literal:K("Literal"),Splat:K("Splat"),Param:K("Param"),Optional:K("Optional")},Ts=Cs.parser;Ts.yy=Os;var qr=Ts,Br=Object.keys(Os);function Fr(i){return Br.forEach(function(t){if(typeof i[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:i}}var Rs=Fr,Wr=Rs,Yr=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Ns(i){this.captures=i.captures,this.re=i.re}Ns.prototype.match=function(i){var t=this.re.exec(i),e={};if(t)return this.captures.forEach(function(r,s){typeof t[s+1]>"u"?e[r]=void 0:e[r]=decodeURIComponent(t[s+1])}),e};var Kr=Wr({Concat:function(i){return i.children.reduce((function(t,e){var r=this.visit(e);return{re:t.re+r.re,captures:t.captures.concat(r.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(i){return{re:i.props.value.replace(Yr,"\\$&"),captures:[]}},Splat:function(i){return{re:"([^?]*?)",captures:[i.props.name]}},Param:function(i){return{re:"([^\\/\\?]+)",captures:[i.props.name]}},Optional:function(i){var t=this.visit(i.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(i){var t=this.visit(i.children[0]);return new Ns({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Jr=Kr,Gr=Rs,Zr=Gr({Concat:function(i,t){var e=i.children.map((function(r){return this.visit(r,t)}).bind(this));return e.some(function(r){return r===!1})?!1:e.join("")},Literal:function(i){return decodeURI(i.props.value)},Splat:function(i,t){return t[i.props.name]?t[i.props.name]:!1},Param:function(i,t){return t[i.props.name]?t[i.props.name]:!1},Optional:function(i,t){var e=this.visit(i.children[0],t);return e||""},Root:function(i,t){t=t||{};var e=this.visit(i.children[0],t);return e?encodeURI(e):!1}}),Qr=Zr,Xr=qr,ti=Jr,ei=Qr;wt.prototype=Object.create(null);wt.prototype.match=function(i){var t=ti.visit(this.ast),e=t.match(i);return e||!1};wt.prototype.reverse=function(i){return ei.visit(this.ast,i)};function wt(i){var t;if(this?t=this:t=Object.create(wt.prototype),typeof i>"u")throw new Error("A route spec is required");return t.spec=i,t.ast=Xr.parse(i),t}var si=wt,ri=si,ii=ri;const ni=Dr(ii);var oi=Object.defineProperty,Us=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&oi(t,e,s),s};const Ls=class extends Z{constructor(t,e,r=""){super(),this._cases=[],this._fallback=()=>lt` <h1>Not Found</h1> `,this._cases=t.map(s=>({...s,route:new ni(s.path)})),this._historyObserver=new mt(this,e),this._authObserver=new mt(this,r)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),lt` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(fs(this,"auth/redirect"),lt` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):lt` <h1>Authenticating</h1> `;if("redirect"in e){const r=e.redirect;if(typeof r=="string")return this.redirect(r),lt` <h1>Redirecting to ${r}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:r}=t,s=new URLSearchParams(e),n=r+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:r,params:l,query:s}}}redirect(t){ce(this,"history/redirect",{href:t})}};Ls.styles=$r`
    :host,
    main {
      display: contents;
    }
  `;let Lt=Ls;Us([ks()],Lt.prototype,"_user");Us([ks()],Lt.prototype,"_match");const ai=Object.freeze(Object.defineProperty({__proto__:null,Element:Lt,Switch:Lt},Symbol.toStringTag,{value:"Module"})),li=class Ms extends HTMLElement{constructor(){if(super(),zt(this).template(Ms.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};li.template=D`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;const Hs=class ne extends HTMLElement{constructor(){super(),this._array=[],zt(this).template(ne.template).styles(ne.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(js("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const r=new Event("change",{bubbles:!0}),s=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=s,this.dispatchEvent(r)}}}),this.addEventListener("click",t=>{re(t,"button.add")?Tt(t,"input-array:add"):re(t,"button.remove")&&Tt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],ci(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const r=Array.from(this.children).indexOf(e);this._array.splice(r,1),e.remove()}}};Hs.template=D`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;Hs.styles=ms`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function ci(i,t){t.replaceChildren(),i.forEach((e,r)=>t.append(js(e)))}function js(i,t){const e=i===void 0?D`<input />`:D`<input value="${i}" />`;return D`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function hi(i){return Object.entries(i).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var ui=Object.defineProperty,di=Object.getOwnPropertyDescriptor,pi=(i,t,e,r)=>{for(var s=di(t,e),n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&ui(t,e,s),s};class fi extends Z{constructor(t){super(),this._pending=[],this._observer=new mt(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([r,s])=>{console.log("Dispatching queued event",s,r),r.dispatchEvent(s)}),e.setEffect(()=>{var r;if(console.log("View effect",this,e,(r=this._context)==null?void 0:r.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const r=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",r),e.dispatchEvent(r)):(console.log("Queueing message event",r),this._pending.push([e,r]))}ref(t){return this.model?this.model[t]:void 0}}pi([Ps()],fi.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=globalThis,fe=Ot.ShadowRoot&&(Ot.ShadyCSS===void 0||Ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,me=Symbol(),Ge=new WeakMap;let Is=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(fe&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=Ge.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Ge.set(e,t))}return t}toString(){return this.cssText}};const mi=i=>new Is(typeof i=="string"?i:i+"",void 0,me),C=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new Is(e,i,me)},gi=(i,t)=>{if(fe)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),s=Ot.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},Ze=fe?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return mi(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:vi,defineProperty:yi,getOwnPropertyDescriptor:_i,getOwnPropertyNames:$i,getOwnPropertySymbols:bi,getPrototypeOf:Ai}=Object,R=globalThis,Qe=R.trustedTypes,Ei=Qe?Qe.emptyScript:"",Zt=R.reactiveElementPolyfillSupport,dt=(i,t)=>i,Mt={toAttribute(i,t){switch(t){case Boolean:i=i?Ei:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ge=(i,t)=>!vi(i,t),Xe={attribute:!0,type:String,converter:Mt,reflect:!1,useDefault:!1,hasChanged:ge};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&yi(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:n}=_i(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){const l=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xe}static _$Ei(){if(this.hasOwnProperty(dt("elementProperties")))return;const t=Ai(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(dt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(dt("properties"))){const e=this.properties,r=[...$i(e),...bi(e)];for(const s of r)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)e.unshift(Ze(s))}else t!==void 0&&e.push(Ze(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){var n;const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:Mt).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var n,o;const r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=r.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:Mt;this._$Em=s,this[s]=a.fromAttribute(e,l.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(t,e,r){var s;if(t!==void 0){const n=this.constructor,o=this[t];if(r??(r=n.getPropertyOptions(t)),!((r.hasChanged??ge)(o,e)||r.useDefault&&r.reflect&&o===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[dt("elementProperties")]=new Map,G[dt("finalized")]=new Map,Zt==null||Zt({ReactiveElement:G}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=globalThis,Ht=pt.trustedTypes,ts=Ht?Ht.createPolicy("lit-html",{createHTML:i=>i}):void 0,zs="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Ds="?"+T,wi=`<${Ds}>`,B=document,yt=()=>B.createComment(""),_t=i=>i===null||typeof i!="object"&&typeof i!="function",ve=Array.isArray,xi=i=>ve(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Qt=`[ 	
\f\r]`,ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,es=/-->/g,ss=/>/g,j=RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rs=/'/g,is=/"/g,Vs=/^(?:script|style|textarea|title)$/i,Si=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),y=Si(1),st=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),ns=new WeakMap,z=B.createTreeWalker(B,129);function qs(i,t){if(!ve(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ts!==void 0?ts.createHTML(t):t}const Pi=(i,t)=>{const e=i.length-1,r=[];let s,n=t===2?"<svg>":t===3?"<math>":"",o=ct;for(let l=0;l<e;l++){const a=i[l];let d,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ct?f[1]==="!--"?o=es:f[1]!==void 0?o=ss:f[2]!==void 0?(Vs.test(f[2])&&(s=RegExp("</"+f[2],"g")),o=j):f[3]!==void 0&&(o=j):o===j?f[0]===">"?(o=s??ct,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?j:f[3]==='"'?is:rs):o===is||o===rs?o=j:o===es||o===ss?o=ct:(o=j,s=void 0);const h=o===j&&i[l+1].startsWith("/>")?" ":"";n+=o===ct?a+wi:u>=0?(r.push(d),a.slice(0,u)+zs+a.slice(u)+T+h):a+T+(u===-2?l:h)}return[qs(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class $t{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Pi(t,e);if(this.el=$t.createElement(d,r),z.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=z.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(zs)){const c=f[o++],h=s.getAttribute(u).split(T),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Ci:p[1]==="?"?Oi:p[1]==="@"?Ti:Vt}),s.removeAttribute(u)}else u.startsWith(T)&&(a.push({type:6,index:n}),s.removeAttribute(u));if(Vs.test(s.tagName)){const u=s.textContent.split(T),c=u.length-1;if(c>0){s.textContent=Ht?Ht.emptyScript:"";for(let h=0;h<c;h++)s.append(u[h],yt()),z.nextNode(),a.push({type:2,index:++n});s.append(u[c],yt())}}}else if(s.nodeType===8)if(s.data===Ds)a.push({type:2,index:n});else{let u=-1;for(;(u=s.data.indexOf(T,u+1))!==-1;)a.push({type:7,index:n}),u+=T.length-1}n++}}static createElement(t,e){const r=B.createElement("template");return r.innerHTML=t,r}}function rt(i,t,e=i,r){var o,l;if(t===st)return t;let s=r!==void 0?(o=e._$Co)==null?void 0:o[r]:e._$Cl;const n=_t(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=s:e._$Cl=s),s!==void 0&&(t=rt(i,s._$AS(i,t.values),s,r)),t}class ki{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=((t==null?void 0:t.creationScope)??B).importNode(e,!0);z.currentNode=s;let n=z.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new xt(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Ri(n,this,t)),this._$AV.push(d),a=r[++l]}o!==(a==null?void 0:a.index)&&(n=z.nextNode(),o++)}return z.currentNode=B,s}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class xt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rt(this,t,e),_t(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==st&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=$t.createElement(qs(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const o=new ki(s,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=ns.get(t.strings);return e===void 0&&ns.set(t.strings,e=new $t(t)),e}k(t){ve(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const n of t)s===e.length?e.push(r=new xt(this.O(yt()),this.O(yt()),this,this.options)):r=e[s],r._$AI(n),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Vt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,n){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=A}_$AI(t,e=this,r,s){const n=this.strings;let o=!1;if(n===void 0)t=rt(this,t,e,0),o=!_t(t)||t!==this._$AH&&t!==st,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=rt(this,l[r+a],e,a),d===st&&(d=this._$AH[a]),o||(o=!_t(d)||d!==this._$AH[a]),d===A?t=A:t!==A&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ci extends Vt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class Oi extends Vt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class Ti extends Vt{constructor(t,e,r,s,n){super(t,e,r,s,n),this.type=5}_$AI(t,e=this){if((t=rt(this,t,e,0)??A)===st)return;const r=this._$AH,s=t===A&&r!==A||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==A&&(r===A||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ri{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){rt(this,t)}}const Xt=pt.litHtmlPolyfillSupport;Xt==null||Xt($t,xt),(pt.litHtmlVersions??(pt.litHtmlVersions=[])).push("3.3.0");const Ni=(i,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let s=r._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;r._$litPart$=s=new xt(t.insertBefore(yt(),n),n,void 0,e??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis;class w extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ni(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return st}}var os;w._$litElement$=!0,w.finalized=!0,(os=V.litElementHydrateSupport)==null||os.call(V,{LitElement:w});const te=V.litElementPolyfillSupport;te==null||te({LitElement:w});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.0");const U=C`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,$e=class $e extends w{renderSignOutButton(){return y`
      <button
        class="signout-button"
        @click=${t=>Re.relay(t,"auth:message",["auth/signout"])}
      >
        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-signout" />
        </svg>
      </button>
    `}render(){return y`<nav class="nav-container">
      <div class="nav-contents">
        <h1><a href="/" class="title-logo">WTM</a></h1>
        <h2>
          <svg class="nav-icon">
            <use href="/icons/sprite.svg#icon-group" />
          </svg>
        </h2>

        <svg class="nav-icon">
          <use href="/icons/sprite.svg#icon-add" />
        </svg>
        <h2>
          <a href="/app/group/side-questers/plans">
            <span class="nav-text">SQ</span>
          </a>
        </h2>
        <h2>
          <a href="/app/group/roomies/plans">
            <span class="nav-text">Roomies</span>
          </a>
        </h2>
        <label id="theme-toggle-label">
          <input
            type="checkbox"
            autocomplete="off"
            @change=${t=>Re.relay(t,"theme:toggle",{checked:t.target.checked})}
          />
          <span class="nav-text">Light mode</span>
        </label>

        ${this.renderSignOutButton()}
      </div>
    </nav>`}};$e.styles=[U,C`
      .title-logo {
        font-family: var(--font-logo);
        font-size: var(--size-font-xxl);
        color: var(--color-accent-yellow);
        text-decoration: none;
      }

      .nav-container {
        background-color: var(--color-bg-nav);
        margin: var(--space-sm);
        border-radius: var(--radius-sm);
        padding: var(--space-sm);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100vh;
      }

      .nav-contents {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        align-items: center;
        justify-content: center;
      }

      .nav-text {
        text-decoration: none;
        color: var(--color-text-primary);
      }

      .nav-icon {
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        color: var(--color-text-primary);
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      .signout-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
      .signout-button .nav-icon {
        width: 2em;
        height: 2em;
        fill: currentColor;
        color: var(--color-text-primary);
      }
    `];let oe=$e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ui={attribute:!0,type:String,converter:Mt,reflect:!1,hasChanged:ge},Li=(i=Ui,t,e)=>{const{kind:r,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),r==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,i)},init(l){return l!==void 0&&this.C(o,void 0,i,l),l}}}if(r==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+r)};function _(i){return(t,e)=>typeof e=="object"?Li(i,t,e):((r,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function qt(i){return _({...i,state:!0,attribute:!1})}var Mi=Object.defineProperty,ye=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Mi(t,e,s),s};const be=class be extends w{constructor(){super(...arguments),this.type="home",this.groupName="",this._authObserver=new mt(this,"wtm:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const e=t.user;this.username=e!=null&&e.authenticated?e.username:void 0})}render(){return y`
      <h1 class="page-header">
        ${this.type==="home"?`Welcome back ${this.username}! What’s your next move?`:y`<a href="/app/group/${this.groupName}/plans"
              >${this.groupName}</a
            >`}
      </h1>
    `}};be.styles=[U,C`
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
    `];let it=be;ye([_()],it.prototype,"type");ye([_({attribute:"group-name"})],it.prototype,"groupName");ye([qt()],it.prototype,"username");var Hi=Object.defineProperty,Bs=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Hi(t,e,s),s};const Ae=class Ae extends w{constructor(){super(...arguments),this.groups=[]}willUpdate(t){console.log("GroupList fetching from:",this.src),t.has("src")&&this.src&&this.hydrate(this.src)}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(e=>{if(!e.ok)throw new Error(`Failed to load ${t}`);return e.json()}).then(e=>{this.groups=e}).catch(e=>{console.error(e)})}renderGroup(t){return y`
      <group-card
        groupName=${t.groupName}
        members=${t.members}
        upcoming=${t.upcoming}
        href=${t.href}
        plans-href=${t.plansHref}
        members-href=${t.membersHref}
      ></group-card>
    `}render(){return y`<div class="card-row">
      ${this.groups.length>0?this.groups.map(this.renderGroup):y`<p class="empty-state">No groups to show yet.</p>`}
    </div>`}};Ae.styles=[U,C`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let bt=Ae;Bs([_()],bt.prototype,"src");Bs([qt()],bt.prototype,"groups");var ji=Object.defineProperty,nt=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&ji(t,e,s),s};const Ee=class Ee extends w{constructor(){super(...arguments),this.groupName="",this.members="",this.upcoming="",this.href="",this.plansHref="",this.membersHref=""}render(){return y`<div class="card-container">
        <a href=${this.href} class="card-colorbox">
        <div class="card-colorbox"></div>
      </a>

      <div class="card-text-container">
        <a href=${this.href}  class="card-textLg">
          <div class="card-textLg">${this.groupName}</div>
        </a>
        <a href=${this.membersHref}>
          <div class="card-textSm">Members: ${this.members}</div>
        </a>
        <div class="card-textSm">Upcoming: ${this.upcoming}</div>
        <a href=${this.plansHref}>
          <div class="card-textXs">View plans</div>
        </a>
      </div>
    </div>`}};Ee.styles=[U,C`
      .card-container {
        width: 300px; /* fixed width so 3 fit in one row */
        height: 300px; /* fixed height */
        background-color: var(--color-bg-nav);
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        flex-shrink: 0; /* prevent shrinking */
        overflow: hidden;
        border-radius: var(--radius-sm);
      }
      .card-colorbox {
        width: 100%;
        height: 50%; /* half of the parent height */
        background-color: var(--color-accent-pink);
      }
      .card-text-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        width: 100%;
        height: 50%;
        padding: var(--space-xs);
        overflow: hidden;
      }

      .card-textLg {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        font-weight: bold;
        color: var(--color-text-primary);
      }
      .card-textMd {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        color: var(--color-text-primary);
      }
      .card-textSm {
        font-family: var(--font-body);
        font-size: var(--size-font-small);
        color: var(--color-text-primary);
      }

      .card-textXs {
        font-family: var(--font-body);
        font-size: var(--size-font-xs);
        color: var(--color-text-primary);
      }
    `];let k=Ee;nt([_()],k.prototype,"groupName");nt([_()],k.prototype,"members");nt([_()],k.prototype,"upcoming");nt([_()],k.prototype,"href");nt([_({attribute:"plans-href"})],k.prototype,"plansHref");nt([_({attribute:"members-href"})],k.prototype,"membersHref");var Ii=Object.defineProperty,zi=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Ii(t,e,s),s};const we=class we extends w{constructor(){super(...arguments),this.activeTab="Plans",this.tabLinks=[{name:"Create",href:"create_plan.html"},{name:"Plans",href:"index.html"},{name:"Activities",href:"activities.html"},{name:"Availability",href:"availability.html"},{name:"Members",href:"members.html"}]}render(){return y`
      <nav class="friendbar">
        ${this.tabLinks.map(t=>y`
            <a
              class="friendbar-link ${this.activeTab===t.name?"active":""}"
              href="${t.href}"
            >
              ${t.name}
            </a>
          `)}
      </nav>
    `}};we.styles=[U,C`
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
    `];let jt=we;zi([_({type:String})],jt.prototype,"activeTab");var Di=Object.defineProperty,Fs=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Di(t,e,s),s};const xe=class xe extends w{constructor(){super(...arguments),this.plans=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(e=>{if(!e.ok)throw new Error(`Failed to load ${t}`);return e.json()}).then(e=>{this.plans=e}).catch(e=>{console.error(e)})}renderPlan(t){return y`
      <plan-card
        activity=${t.activity}
        location=${t.location}
        date=${t.date}
        going=${t.going}
        notes=${t.notes}
      ></plan-card>
    `}render(){return y`
      <div class="card-row">
        ${this.plans.map(t=>this.renderPlan(t))}
      </div>
    `}};xe.styles=[U,C`
      .card-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    `];let At=xe;Fs([_()],At.prototype,"src");Fs([qt()],At.prototype,"plans");var Vi=Object.defineProperty,St=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Vi(t,e,s),s};const Se=class Se extends w{constructor(){super(...arguments),this.activity="",this.location="",this.date="",this.going="",this.notes=""}get goingList(){return this.going.split(",").map(t=>t.trim()).filter(Boolean)}render(){return y`
      <div class="card-container">
        <span class="activity">${this.activity}</span>
        <span class="date">${this.date}</span>
        <div class="going">
          <span>Going:</span>
          <div class="avatar-list">
            ${this.goingList.map(t=>y`<avatar-circle .initial=${t}></avatar-circle>`)}
          </div>
        </div>
        <span class="notes"> Notes: ${this.notes}</span>
      </div>
    `}};Se.styles=[U,C`
      .card-container {
        display: flex;
        width: 300px;
        height: 300px;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        background-color: var(--color-bg-nav);
        border-radius: 16px;
      }
      .activity {
        font-family: var(--font-body);
        font-size: var(--size-font-xl);
        font-weight: bold;
        margin: 0;
      }
      .date {
        font-family: var(--font-body);
        font-size: var(--size-font-lg);
        margin: 0;
      }
      .going {
        font-family: var(--font-body);
        font-size: var(--size-font-body);
        margin: 0;
      }
      .notes {
        font-family: var(--font-body);
        font-size: var(--size-font-sm);
        margin: 0;
        overflow: hidden;
      }
      .avatar-list {
        display: flex;
        align-items: center;
        gap: 8.054px;
      }
    `];let N=Se;St([_()],N.prototype,"activity");St([_()],N.prototype,"location");St([_()],N.prototype,"date");St([_()],N.prototype,"going");St([_()],N.prototype,"notes");var qi=Object.defineProperty,Bi=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&qi(t,e,s),s};const Pe=class Pe extends w{constructor(){super(...arguments),this.initial=""}render(){return y` <div class="circle">${this.initial}</div> `}};Pe.styles=[U,C`
      .circle {
        display: flex;
        width: 31.209px;
        height: 31.209px;
        padding: 8.557px 11.578px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5.034px;
        border-radius: 15.605px;
        background: var(--color-text-primary);
        color: var(--color-bg-dark);
        font-family: var(--font-body);
      }
    `];let It=Pe;Bi([_()],It.prototype,"initial");class Fi extends w{render(){return console.log("Rendering home-view"),y`
      <page-header type="home"></page-header>
      <group-list src="/data/groups.json"></group-list>
    `}}var Wi=Object.defineProperty,Ws=(i,t,e,r)=>{for(var s=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=o(t,e,s)||s);return s&&Wi(t,e,s),s};class _e extends w{constructor(){super(...arguments),this.groupId=""}connectedCallback(){super.connectedCallback(),this.loadGroupData()}async loadGroupData(){try{const e=await(await fetch("/data/groups.json")).json();this.groupData=e.find(r=>r.groupId===this.groupId)}catch(t){console.error("Error loading group data",t)}}render(){return this.groupData?y`
      <div class="page-grid">
        <div class="page-header-grid">
          <page-header
            type="group"
            group-name=${this.groupData.groupName}
          ></page-header>
          <friend-nav activeTab="Plans"></friend-nav>
        </div>
        <plan-list src="/data/plans-${this.groupId}.json"></plan-list>
      </div>
    `:y`<p>Loading group info...</p>`}}Ws([_({attribute:"group-id"})],_e.prototype,"groupId");Ws([qt()],_e.prototype,"groupData");const Yi=[{path:"/app",view:()=>y`<home-view></home-view>`},{path:"/app/group/:groupId/plans",view:i=>y`<plans-view group-id=${i.groupId}></plans-view>`},{path:"/",redirect:"/app"}];hi({"wtm-nav":oe,"page-header":it,"mu-auth":hr.Provider,"mu-history":gr.Provider,"mu-switch":class extends ai.Element{constructor(){super(Yi,"wtm:history","wtm:auth")}},"home-view":Fi,"plans-view":_e,"group-list":bt,"group-card":k,"friend-nav":jt,"plan-list":At,"plan-card":N,"avatar-circle":It});document.body.addEventListener("theme:toggle",i=>{const t=i.detail.checked;document.body.classList.toggle("light-mode",t)});
